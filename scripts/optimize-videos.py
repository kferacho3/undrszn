#!/usr/bin/env python3
"""Build browser-ready media from the original UNDRSZN exports."""
import concurrent.futures
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path.home() / 'Downloads/undrszn videos'
OUT = ROOT / 'public/videos'
OUT.mkdir(parents=True, exist_ok=True)
SOURCES = {
    'film': 'ce4e87e57e8c4b46aad1096b792045f9.HD-1080p-7.2Mbps-93595930.mp4',
    'portrait-01': '2625399e72a24168bdce5e28a6e5c375.HD-1080p-2.5Mbps-94277544.mp4',
    'portrait-02': '97c29db286c5401daea86e7b5362badf.HD-1080p-7.2Mbps-94541455.mp4',
}

def run(args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-nostdin', '-y', *args], check=True)

def build(name, filename):
    source = SOURCE / filename
    for quality, height, rate in [('hd', 1080, '1650k'), ('sd', 720, '850k')]:
        target = OUT / f'{name}-{quality}.mp4'
        run(['-i', str(source), '-map', '0:v:0', '-map', '0:a:0?',
             '-vf', f'scale=-2:{height}:out_range=tv', '-c:v', 'libx264', '-preset', 'medium', '-threads', '4',
             '-crf', '24' if quality == 'hd' else '26', '-maxrate', rate,
             '-bufsize', rate, '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-g', '48',
             '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', str(target)])
        if target.stat().st_size >= 95_000_000:
            raise RuntimeError(f'{target.name} exceeds the 95 MB asset budget')
        print(f'{target.name}: {target.stat().st_size / 1e6:.2f} MB', flush=True)
    run(['-ss', '2', '-i', str(source), '-frames:v', '1', '-vf', 'scale=-2:720',
         '-q:v', '3', str(OUT / f'{name}-poster.jpg')])
    if name != 'film':
        run(['-i', str(OUT / f'{name}-sd.mp4'), '-map', '0:v:0', '-c:v', 'copy',
             '-an', '-movflags', '+faststart', str(OUT / f'{name}-loop.mp4')])

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    list(pool.map(lambda entry: build(*entry), SOURCES.items()))

manifest = {}
for name, source in SOURCES.items():
    probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format',
        '-show_streams', '-of', 'json', str(OUT / f'{name}-hd.mp4')]))
    video = next(stream for stream in probe['streams'] if stream['codec_type'] == 'video')
    manifest[name] = {
        'source': source,
        'duration': float(probe['format']['duration']),
        'width': video['width'], 'height': video['height'],
        'hd': f'/videos/{name}-hd.mp4', 'sd': f'/videos/{name}-sd.mp4',
        'poster': f'/videos/{name}-poster.jpg',
        **({'loop': f'/videos/{name}-loop.mp4'} if name != 'film' else {}),
    }
(OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
