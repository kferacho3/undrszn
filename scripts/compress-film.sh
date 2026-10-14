#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# compress-film.sh — turn a film master into web-ready files for the site.
#
#   npm run films:compress -- <master-file> <film-id> [options]
#   bash scripts/compress-film.sh ~/Movies/journey-master.mov journey
#   bash scripts/compress-film.sh ~/Movies/loop.mov ambient-loop --loop --start 00:00:12 --duration 10
#
# film-id must match a key in src/data/films.ts:
#   journey | campaign-cut | bts-reel | ambient-loop
#
# Options:
#   --loop              Silent background loop (no audio, 720p + 1080p, smaller files)
#   --webm              Also encode VP9/Opus WebM (smaller, slower to encode)
#   --start HH:MM:SS    Trim: start time
#   --duration SECONDS  Trim: length
#   --poster HH:MM:SS   Frame to use as the poster (default: 15% into the film)
#   --out DIR           Output directory (default: public/media/films)
#
# Outputs (in --out):
#   <id>-1080.mp4  <id>-720.mp4  [<id>-1080.webm <id>-720.webm]  <id>-poster.jpg
# and prints the `sources` / `posterSrc` block to paste into src/data/films.ts.
#
# Requires ffmpeg + ffprobe. H.264 High profile, yuv420p, +faststart (playback
# begins before the whole file downloads), AAC 128k stereo, max 30 fps kept.
# ---------------------------------------------------------------------------
set -euo pipefail

usage() { sed -n '3,25p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }
[[ $# -lt 2 ]] && usage

INPUT="$1"; ID="$2"; shift 2
LOOP=0; WEBM=0; START=""; DURATION=""; POSTER_AT=""; OUT="public/media/films"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --loop) LOOP=1 ;;
    --webm) WEBM=1 ;;
    --start) START="$2"; shift ;;
    --duration) DURATION="$2"; shift ;;
    --poster) POSTER_AT="$2"; shift ;;
    --out) OUT="$2"; shift ;;
    *) echo "Unknown option: $1"; usage ;;
  esac
  shift
done

case "$ID" in journey|campaign-cut|bts-reel|ambient-loop) ;; *) echo "film-id must be one of: journey campaign-cut bts-reel ambient-loop"; exit 1 ;; esac
command -v ffmpeg >/dev/null || { echo "ffmpeg is required (brew install ffmpeg / apt install ffmpeg)"; exit 1; }
[[ -f "$INPUT" ]] || { echo "Input not found: $INPUT"; exit 1; }
mkdir -p "$OUT"

TRIM=()
[[ -n "$START" ]] && TRIM+=(-ss "$START")
[[ -n "$DURATION" ]] && TRIM+=(-t "$DURATION")

SRC_DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$INPUT" | cut -d. -f1)
LEN=${DURATION:-$SRC_DUR}
if [[ -z "$POSTER_AT" ]]; then POSTER_AT=$(( ${LEN:-10} * 15 / 100 )); fi
HAS_AUDIO=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$INPUT" | head -1)

# Scale to height H, keep aspect, even width; cap frame rate at 30.
vf() { echo "scale=-2:$1:flags=lanczos,fps=fps='min(source_fps,30)',format=yuv420p"; }

encode_mp4() {
  local h="$1" crf="$2" maxrate="$3" bufsize="$4" out="$OUT/$ID-$1.mp4"
  local audio=(-an)
  if [[ $LOOP -eq 0 && -n "$HAS_AUDIO" ]]; then audio=(-c:a aac -b:a 128k -ac 2); fi
  echo "→ $out"
  ffmpeg -hide_banner -loglevel error -stats -y "${TRIM[@]}" -i "$INPUT" \
    -vf "$(vf "$h")" -c:v libx264 -preset slow -profile:v high -crf "$crf" \
    -maxrate "$maxrate" -bufsize "$bufsize" -g 60 -movflags +faststart \
    "${audio[@]}" "$out"
}

encode_webm() {
  local h="$1" crf="$2" out="$OUT/$ID-$1.webm"
  local audio=(-an)
  if [[ $LOOP -eq 0 && -n "$HAS_AUDIO" ]]; then audio=(-c:a libopus -b:a 112k); fi
  echo "→ $out"
  ffmpeg -hide_banner -loglevel error -stats -y "${TRIM[@]}" -i "$INPUT" \
    -vf "$(vf "$h")" -c:v libvpx-vp9 -crf "$crf" -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
    "${audio[@]}" "$out"
}

if [[ $LOOP -eq 1 ]]; then
  encode_mp4 1080 26 3M 6M
  encode_mp4 720 28 1.5M 3M
  [[ $WEBM -eq 1 ]] && { encode_webm 1080 36; encode_webm 720 38; }
else
  # Caps keep a 6-minute 1080p film around ~80–95 MB worst case (GitHub's hard limit is 100 MB per file).
  encode_mp4 1080 23 1.9M 3.8M
  encode_mp4 720 24 1M 2M
  [[ $WEBM -eq 1 ]] && { encode_webm 1080 33; encode_webm 720 35; }
fi

echo "→ $OUT/$ID-poster.jpg (at ${POSTER_AT}s)"
ffmpeg -hide_banner -loglevel error -y "${TRIM[@]}" -i "$INPUT" -ss "$POSTER_AT" -frames:v 1 \
  -vf "scale=-2:1080:flags=lanczos" -q:v 3 "$OUT/$ID-poster.jpg"

echo
echo "Sizes:"
LARGE=0
for f in "$OUT/$ID"-*; do
  bytes=$(wc -c < "$f")
  printf "  %-48s %6.1f MB\n" "$f" "$(echo "$bytes / 1048576" | bc -l)"
  (( bytes > 95*1024*1024 )) && LARGE=1
done
if [[ $LARGE -eq 1 ]]; then
  echo
  echo "⚠  A file is over 95 MB. GitHub rejects files over 100 MB. Host it on a CDN"
  echo "   (Shopify Files, Cloudflare R2/Stream, Mux, Vercel Blob) and use the absolute URL in films.ts,"
  echo "   or track public/media/films with Git LFS. See docs/VIDEO_INTEGRATION.md."
fi

OUT_CLEAN="${OUT#./}"; OUT_CLEAN="${OUT_CLEAN%/}"
if [[ "$OUT_CLEAN" == public/* ]]; then
  PUBLIC_PREFIX="/${OUT_CLEAN#public/}"
else
  PUBLIC_PREFIX="https://YOUR-CDN.example.com/films"
  echo
  echo "Output is outside public/: upload the files to your CDN and replace the placeholder host below."
fi
echo
echo "Paste into src/data/films.ts → films[\"$ID\"]:"
echo
echo "    posterSrc: \"$PUBLIC_PREFIX/$ID-poster.jpg\","
echo "    sources: ["
[[ $WEBM -eq 1 ]] && echo "      { src: \"$PUBLIC_PREFIX/$ID-1080.webm\", type: \"video/webm\", height: 1080 },"
echo "      { src: \"$PUBLIC_PREFIX/$ID-1080.mp4\", type: \"video/mp4\", height: 1080 },"
[[ $WEBM -eq 1 ]] && echo "      { src: \"$PUBLIC_PREFIX/$ID-720.webm\", type: \"video/webm\", height: 720 },"
echo "      { src: \"$PUBLIC_PREFIX/$ID-720.mp4\", type: \"video/mp4\", height: 720 },"
echo "    ],"
if [[ -n "$LEN" ]]; then
  printf '    durationLabel: "%02d:%02d",\n' $((LEN / 60)) $((LEN % 60))
fi
