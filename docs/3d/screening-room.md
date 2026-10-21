# UNDR screening room

The first home-page chapter is a real Three.js scene. The original portrait campaign film plays on a matching 9:16 display. The two portraits, six-minute Journey, interactive UNDR meanings, and remaining storefront follow in that order.

## Source and export

- User-provided source: `UNDR-SZN-Monkey.glb` (Modly, untextured, ~850k triangles).
- Original backup and editable Blender scene are stored locally in `~/Documents/UNDR-3D-Source/`; raw meshes are not shipped or committed.
- The supplied character was posed into the seated reference in `assets/source/monkey-screening-room/seated-reference.png` using image generation. This image is the projected front texture. Rear surfaces use a dark cloth material; it is not a full photogrammetry scan.
- `scripts/3d/prepare-monkey.py` normalizes the model to 2.1 units tall, reduces geometry to ~55k triangles, projects the reference texture, adds weighted torso/head bones, and exports three looping clips: `Excited_Rocking`, `Quiet_Breathing`, `Curious_Head_Tilt`.
- `public/media/3d/undr-monkey.glb`: 404 KB, ~35.4k triangles / 21k uploaded vertices, including the full 1024×1536 WebP texture, skin, and all three animations; Meshopt decoder supplied by Three.js.

Rebuild with Blender 5:

```sh
/Applications/Blender.app/Contents/MacOS/Blender --background \
  --python scripts/3d/prepare-monkey.py -- \
  /path/to/UNDR-SZN-Monkey.glb \
  "$PWD/assets/source/monkey-screening-room/seated-reference.png" \
  /path/to/undr-monkey-prepared.glb
npx @gltf-transform/cli optimize /path/to/undr-monkey-prepared.glb \
  public/media/3d/undr-monkey.glb --compress meshopt --flatten false \
  --join false --simplify true --simplify-ratio 0.6 --simplify-error 0.0005 \
  --texture-compress webp --texture-size 1536
npx @gltf-transform/cli validate public/media/3d/undr-monkey.glb
```

## Interaction and safeguards

- The opening camera sits close behind the monkey’s left shoulder, with a slightly angled portrait display ahead. Phones use a wider composition to preserve the full screen and clear controls. Greeting turns the character toward the current camera; the dedicated monkey view reveals the front artwork.
- The final geometry pass reduces triangles by 36% and download size by 20% versus the previous 506 KB model, without reducing texture resolution.

- Drag horizontally to explore within a bounded camera range. Vertical touch gestures continue scrolling the page.
- Tap the monkey for an excited reaction. Tap the display to move closer; tap again or use Back to room to return.
- Focus the canvas: Enter greets, 1 resets the room, 2 brings the monkey closer, 3 focuses the film, Escape resets. Equivalent keyboard access does not add a visible left-side control menu.
- Autoplay is muted. Pause and sound controls remain visible. Only one site film plays at a time; playback/rendering stop offscreen and in hidden tabs.
- Reduced motion starts paused and removes idle animation and smooth camera transitions. Save-Data skips the 3D download and starts paused.
- A normal portrait video/poster remains available if model loading or WebGL fails.
- The GPU pixel ratio is capped at 1.5. Resources and animation loops are disposed on navigation.

The original Shopify store and domain configuration are unchanged.
