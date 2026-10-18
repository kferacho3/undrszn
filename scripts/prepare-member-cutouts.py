"""Create pixel-preserving product cutouts. Requires macOS 14+, Swift, Pillow.
Run with: python3 scripts/prepare-member-cutouts.py
Original images remain untouched. Vision supplies alpha only, never regenerated RGB.
"""
import json
import subprocess
import tempfile
from pathlib import Path
from PIL import Image, ImageFilter

root = Path(__file__).resolve().parents[1]
data_path = root / 'src/data/members.ts'
source = data_path.read_text()
head, body = source.split('export const memberImages: MemberImage[] = ', 1)
raw, tail = body.split('\n];', 1)
items = json.loads(raw + ']')
output = root / 'public/media/members/cutouts'
output.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(prefix='undr-cutouts-') as temporary:
    work = Path(temporary)
    (work / 'input').mkdir()
    (work / 'masks').mkdir()
    products = [item for item in items if item['category'] != 'Editorial']
    for item in products:
        original = item.get('originalSrc', item['src'])
        item['originalSrc'] = original
        photo = Image.open(root / ('public' + original)).convert('RGB')
        if item['id'] == 'midnight-tonal-zip':
            height = round(photo.width * 1701 / 1290)
            top = (photo.height - height) // 2
            photo = photo.crop((0, top, photo.width, top + height))
        photo.save(work / 'input' / (item['id'] + '.png'))
    subprocess.run(['swift', str(root / 'scripts/member-product-masks.swift'), str(work / 'input'), str(work / 'masks')], check=True)
    for item in products:
        name = item['id'] + '.png'
        photo = Image.open(work / 'input' / name).convert('RGBA')
        mask = Image.open(work / 'masks' / name).convert('L')
        # Trim only the antialiased white fringe on dark garments; never recolor RGB.
        if item['id'].startswith('midnight-'):
            mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.35))
        mask = mask.point(lambda value: 0 if value < 12 else 255 if value > 243 else value)
        photo.putalpha(mask)
        item['width'], item['height'] = photo.size
        item.pop('screenshotCrop', None)
        variants = []
        for width in sorted({480, 800, photo.width}):
            if width > photo.width:
                continue
            derivative = photo if width == photo.width else photo.resize((width, round(width * photo.height / photo.width)), Image.Resampling.LANCZOS)
            file = output / f"{item['id']}-{width}.webp"
            derivative.save(file, 'WEBP', lossless=True, method=6, exact=True)
            # Every nontransparent full-size output pixel retains its source RGB.
            if width == photo.width:
                decoded = Image.open(file).convert('RGBA')
                assert decoded.tobytes() == photo.tobytes(), f'Pixel fidelity failed: {file}'
            variants.append(f"/media/members/cutouts/{file.name} {width}w")
        item['src'] = variants[-1].split(' ')[0]
        item['srcSet'] = ', '.join(variants)
        print(item['id'], photo.size)
    data_path.write_text(head + 'export const memberImages: MemberImage[] = ' + json.dumps(items, indent=2) + ';' + tail)
