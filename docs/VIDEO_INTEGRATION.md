# Video integration — adding the films

The site already has a designed slot for every film. Until a film is registered, its slot
shows an honest **“In the edit · premieres here”** state over a still, with no fake play
button. Registering the compressed files switches every placement to the real player.

All wiring lives in one file: **`src/data/films.ts`**.

## The four film slots

| Film id        | What it is                                   | Target length | Where it appears                                   | Player mode |
|----------------|----------------------------------------------|---------------|----------------------------------------------------|-------------|
| `journey`      | **The Journey** — product, brand and vision  | ~6:00         | Home (“The Journey” band), `/pages/journey` (feature + chapters), Our story | Click to play, sound on, captions, chapters, HD/SD, full screen |
| `campaign-cut` | **One Last Dance** — campaign film           | ~0:30–1:30    | Campaign page (“Roll the tape”), Journey page (“Companion films”) | Click to play |
| `bts-reel`     | **Before the Frame** — behind the scenes     | ~0:30–2:00    | Campaign page, Journey page                        | Click to play |
| `ambient-loop` | Silent loop cut from campaign footage        | 6–12 s        | Home hero, right panel (replaces the cream still)  | Muted autoplay loop, pause button, off under reduced motion / Save-Data |

Rename titles, descriptions and runtime labels freely in `films.ts`. Use 16:9 masters for the
first three. The ambient loop is shown cropped (`object-fit: cover`) in a tall 4:5-ish panel,
so keep the subject centred.

## Step 1 — compress

Requires `ffmpeg` (macOS: `brew install ffmpeg`, Ubuntu: `apt install ffmpeg`).

```sh
# The 6-minute Journey film (H.264 MP4 at 1080p + 720p, plus a poster frame)
npm run films:compress -- ~/Movies/journey-master.mov journey

# Short films
npm run films:compress -- ~/Movies/campaign.mov campaign-cut
npm run films:compress -- ~/Movies/bts.mov bts-reel

# Silent hero loop: trim 10 s starting at 0:12
npm run films:compress -- ~/Movies/campaign.mov ambient-loop --loop --start 00:00:12 --duration 10
```

Useful options: `--webm` adds VP9/Opus WebM files (smaller, slower to encode), `--poster 00:01:05`
picks the poster frame, `--out DIR` writes somewhere other than `public/media/films/`.

Files are written to `public/media/films/` as `<id>-1080.mp4`, `<id>-720.mp4` and
`<id>-poster.jpg`. Every MP4 uses H.264 High, `yuv420p`, at most 30 fps, AAC 128k and
`+faststart`, so playback begins before the whole file downloads. Bitrate caps keep the
6-minute 1080p file at roughly 80–95 MB at worst. Most edits land well below that.

## Step 2 — register

The script prints a block like this. Paste it into the matching entry in `src/data/films.ts`,
replacing `sources: []`:

```ts
posterSrc: "/media/films/journey-poster.jpg",
sources: [
  { src: "/media/films/journey-1080.mp4", type: "video/mp4", height: 1080 },
  { src: "/media/films/journey-720.mp4", type: "video/mp4", height: 720 },
],
durationLabel: "06:00",
```

The player picks HD or SD from screen size and connection (Save-Data or 2G/3G gets SD), and
viewers can switch with the HD/SD button. List WebM entries before MP4 entries at the same
height when you encode them.

## Step 3 — optional polish

- **Captions** (recommended for the Journey if there is speech). Add `public/media/films/journey.en.vtt`, then:
  `captions: [{ src: "/media/films/journey.en.vtt", srclang: "en", label: "English", default: true }]`.
  A transcript tool such as Whisper can draft the VTT; proofread it before publishing.
- **Chapters.** The Journey ships with six *working* chapter titles at placeholder timestamps.
  Replace them with the real edit’s timestamps in seconds. They drive the chapter list and the
  tick marks on the scrub bar.
- **Poster.** `posterSrc` overrides `posterAsset`, the still used while the film is pending.

## Hosting large files

GitHub rejects any file over **100 MB**, and the script warns above 95 MB. Choose one:

1. **Keep it in the repo** if every file is under ~95 MB. This is fine for the short films and the loop.
2. **CDN (recommended for the 6-minute film).** Upload to Shopify Files, Cloudflare R2/Stream,
   Mux, Vercel Blob or S3, and put the absolute `https://…` URLs in `sources`. Run the script with
   `--out media-src/` (git-ignored) to keep local outputs out of the repo.
3. **Git LFS.** Run `git lfs track "public/media/films/*.mp4"` and commit `.gitattributes`. Check
   that the host supports LFS files at deploy time; Vercel needs LFS enabled in project settings.

Never commit raw masters. `.mov`, `.prores` and `media-src/` are git-ignored.

## Verify

```sh
npm run build && npm start
```

Then open `/pages/journey` and check the following:

- The poster loads and the play button shows the right runtime.
- Playback starts on click.
- Chapters seek to the right moments.
- HD/SD switching resumes at the same time.
- Captions toggle on and off.
- Full screen works, including on iOS.
- Starting one film pauses any other film on the page.

On the homepage, the hero loop fades in over the still after load. It pauses when scrolled
away and stays paused under “reduce motion”. `/preview-notes` lists each film’s status.

## Behaviour contract (from the redesign blueprint)

- Every placement is complete as a still. Film loads only after the critical image and controls.
- No autoplay with sound. Only the silent loop autoplays, and it has a visible pause control.
- Only one film plays at a time.
- No fake play buttons while a film is pending.
- The two tiny archive thumbnails (`film-car`, `film-arrival`) are never enlarged into heroes.
