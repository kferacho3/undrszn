#!/usr/bin/env python3
"""Retrieve only the 23 original image references recorded in this package.

Requires Python 3.10+ and internet access. No third-party packages, credentials,
fonts, guessed video endpoints, or external write operations are used.
This utility was syntax-checked, but network retrieval was not tested in the
creation environment. Downloads are not evidence of media licensing.
"""
from __future__ import annotations
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import re
import sys
from typing import Any
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
MAX_BYTES = 64 * 1024 * 1024
ALLOWED_HOSTS = {'undrszn.com', 'www.undrszn.com', 'cdn.shopify.com'}
BROWSER_TYPES = {'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'}
EXTENSIONS = {'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp',
              'image/avif': '.avif', 'image/gif': '.gif', 'image/heic': '.heic',
              'image/heif': '.heif'}

def detected_type(header: bytes) -> str | None:
    if header.startswith(b'\x89PNG\r\n\x1a\n'): return 'image/png'
    if header.startswith(b'\xff\xd8\xff'): return 'image/jpeg'
    if header.startswith((b'GIF87a', b'GIF89a')): return 'image/gif'
    if header.startswith(b'RIFF') and header[8:12] == b'WEBP': return 'image/webp'
    if header[4:8] == b'ftyp':
        if b'avif' in header[:64] or b'avis' in header[:64]: return 'image/avif'
        if any(v in header[:64] for v in [b'heic', b'heix', b'hevc', b'hevx', b'mif1']): return 'image/heic'
    return None

def retrieve(asset: dict[str, Any], timeout: float) -> dict[str, Any]:
    result: dict[str, Any] = {'id': asset['id'], 'ok': False, 'browser_format': False}
    temporary: Path | None = None
    try:
        identifier = asset['id']
        if not re.fullmatch(r'[a-z0-9-]+', identifier):
            raise ValueError('Unsafe asset identifier in manifest')
        url = asset['original_url']
        parsed = urlparse(url)
        if parsed.scheme != 'https' or parsed.hostname not in ALLOWED_HOSTS:
            raise ValueError('Only known HTTPS brand/Shopify image hosts are permitted')
        request = Request(url, headers={'User-Agent': 'UNDRSZN-AssetExport/1.0',
                                      'Accept': 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8'})
        with urlopen(request, timeout=timeout) as response:
            final = urlparse(response.geturl())
            if final.scheme != 'https' or final.hostname not in ALLOWED_HOSTS:
                raise ValueError('Unexpected destination host')
            declared = response.headers.get_content_type()
            if not declared.startswith('image/'):
                raise ValueError(f'Expected an image, received {declared}')
            announced = response.headers.get('Content-Length')
            if announced and int(announced) > MAX_BYTES:
                raise ValueError('Image exceeds the 64MB file limit')
            first = response.read(512)
            actual = detected_type(first)
            if actual not in EXTENSIONS:
                raise ValueError('Image signature not recognized; export manually')
            destination = ROOT / 'assets' / (identifier + EXTENSIONS[actual])
            temporary = destination.with_suffix(destination.suffix + '.part')
            total = len(first)
            with temporary.open('wb') as stream:
                stream.write(first)
                while chunk := response.read(512 * 1024):
                    total += len(chunk)
                    if total > MAX_BYTES:
                        raise ValueError('Image exceeds the 64MB file limit')
                    stream.write(chunk)
            temporary.replace(destination)
            result.update(ok=True, browser_format=actual in BROWSER_TYPES,
                          local_file=destination.relative_to(ROOT).as_posix(),
                          bytes=total, detected_type=actual, source=url)
            if actual not in BROWSER_TYPES:
                result['warning'] = 'Keep the original; obtain a browser-compatible export. No conversion was performed.'
    except Exception as error:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
        result['error'] = str(error)
    return result

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--activate-local', action='store_true',
                        help='Use local images only when all 23 files were retrieved in supported browser formats.')
    parser.add_argument('--timeout', type=float, default=20.0, help='Timeout per request in seconds (default 20).')
    parser.add_argument('--workers', type=int, default=3, choices=range(1,5), help='Parallel requests (1–4; default 3).')
    args = parser.parse_args()
    if args.timeout <= 0:
        parser.error('--timeout must be greater than zero')
    manifest_path = ROOT / 'asset-manifest.json'
    data = json.loads(manifest_path.read_text(encoding='utf-8'))
    (ROOT / 'assets').mkdir(exist_ok=True)
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        results = list(pool.map(lambda asset: retrieve(asset, args.timeout), data['assets']))
    lookup = {entry['id']: entry for entry in results}
    for asset in data['assets']:
        result = lookup[asset['id']]
        asset['retrieval'] = result
        if result['ok']:
            asset['local_file'] = result['local_file']
        print(f"{'OK' if result['ok'] else 'FAILED'} {asset['id']}: " +
              (result.get('warning') or result.get('local_file') or result.get('error', '')))
    all_ready = all(item['ok'] and item['browser_format'] for item in results)
    activated = bool(args.activate_local and all_ready)
    if args.activate_local:
        data['media_mode'] = 'local' if all_ready else 'remote-originals'
    manifest_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (ROOT / 'docs' / 'asset-retrieval-report.json').write_text(
        json.dumps({'all_ready': all_ready, 'local_mode_activated': activated, 'results': results}, indent=2) + '\n',
        encoding='utf-8')
    from build_preview import build
    build()
    print('Preview rebuilt. Media mode:', data['media_mode'])
    if args.activate_local and not all_ready:
        print('Local mode was NOT activated. See docs/asset-retrieval-report.json.', file=sys.stderr)
    return 0 if all_ready else 2

if __name__ == '__main__':
    raise SystemExit(main())
