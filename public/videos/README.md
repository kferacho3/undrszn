# Optimized UNDRSZN videos

Original files remain untouched in `~/Downloads/undrszn videos/`.
Regenerate with `python3 scripts/optimize-videos.py` from the repository root.
Requires FFmpeg and FFprobe.

- `film`: complete 6-minute-40-second landscape film.
- `portrait-01`: 10-second car clip.
- `portrait-02`: 7-second street clip.
- `*-hd.mp4`: original height (1080), H.264 video and AAC audio.
- `*-sd.mp4`: 720-pixel height, lower bandwidth, audio retained.
- `*-loop.mp4`: silent SD portrait copies for muted inline loops.
- `*-poster.jpg`: local 720-pixel-height poster frames.
- `manifest.json`: source mapping, dimensions, duration, and public URLs.

All MP4 files use yuv420p and fast-start metadata. HD is capped at 1.65 Mbps
video plus 96 kbps audio; SD at 850 kbps video plus 96 kbps audio. Encoding
fails if an individual playback file reaches 95 MB. Frame rate and full
source duration are retained. Portrait clips retain their aspect ratio.

Serve the contents of this directory at `/videos/` (standard `public/videos`
layout). Use `preload="metadata"` for deliberate playback, local posters,
and muted `playsinline` video for decorative loops. Respect reduced-motion
preferences and provide pause controls. Do not download both qualities on
initial page load. Real captions and chapter metadata must come from the
final edit; this asset package does not invent them.

The film registry in `src/data/films.ts` connects `film` to The Journey,
`portrait-02` to the campaign cut and silent hero loop, and `portrait-01`
to the companion slot historically named `bts-reel`. The latter is a campaign
animation, not behind-the-scenes footage. Verified chapter timestamps and
captions have not been supplied; placeholder chapters are disabled.
