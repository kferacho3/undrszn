#!/usr/bin/env python3
"""Rebuild the dependency-free interface preview; image files stay external."""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def build() -> Path:
    data = json.loads((ROOT / 'asset-manifest.json').read_text(encoding='utf-8'))
    data_js = 'window.UNDR_DATA = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n'
    (ROOT / 'data.js').write_text(data_js, encoding='utf-8')
    document = (ROOT / 'index.html').read_text(encoding='utf-8')
    replacements = {
        '<link rel="stylesheet" href="styles.css">': '<style>' + (ROOT / 'styles.css').read_text(encoding='utf-8') + '</style>',
        '<script src="data.js"></script>': '<script>' + data_js.replace('</script', '<\\/script') + '</script>',
        '<script src="app.js"></script>': '<script>' + (ROOT / 'app.js').read_text(encoding='utf-8').replace('</script', '<\\/script') + '</script>',
    }
    for token, replacement in replacements.items():
        if token not in document:
            raise ValueError(f'Missing expected source marker: {token}')
        document = document.replace(token, replacement, 1)
    destination = ROOT / 'UNDRSZN_Preview.html'
    destination.write_text(document, encoding='utf-8')
    return destination

if __name__ == '__main__':
    print(build())
