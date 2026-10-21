import * as THREE from "three";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type View = "room" | "monkey" | "film";

/** Portrait cinema, real video texture, bounded camera exploration and seated reactions. */
export async function createScreeningRoom(canvas: HTMLCanvasElement, movie: HTMLVideoElement, onReady: () => void, onFallback: () => void, onView: (view: View) => void) {
  // Load first, so a failed download never leaves an orphan renderer or animation loop.
  const [gltf, poster] = await Promise.all([
    new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync("/media/3d/undr-monkey.glb"),
    new THREE.TextureLoader().loadAsync("/videos/portrait-02-poster.jpg"),
  ]);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#050b12");
  scene.fog = new THREE.FogExp2("#050b12", .035);
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 60);
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  scene.add(new THREE.HemisphereLight(0xbecde1, 0x261c16, 1.8));
  const screenLight = new THREE.PointLight(0x77c4ff, 32, 13, 2);
  screenLight.position.set(1.4, 2.5, .5); scene.add(screenLight);
  const key = new THREE.DirectionalLight(0xffe6cb, 2.6);
  key.position.set(1, 5, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: .5, far: 25 });
  key.shadow.normalBias = .035; key.shadow.bias = -.0003;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x5f9edb, 2.3);
  rim.position.set(-3, 4, -2); scene.add(rim);
  const warm = new THREE.PointLight(0xf06839, 9, 8, 2);
  warm.position.set(-4, 1.2, .5); scene.add(warm);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x101820, roughness: .7, metalness: .08 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.025; floor.receiveShadow = true; scene.add(floor);

  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 128;
  const ctx = glowCanvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(65,145,230,.3)"); gradient.addColorStop(1, "rgba(65,145,230,0)");
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(glowCanvas), transparent: true, depthWrite: false }));
  glow.rotation.x = -Math.PI / 2; glow.position.set(1, -.01, 0); scene.add(glow);

  // The physical display is 9:16, matching the film exactly. No bars, crop or distortion.
  const tv = new THREE.Group(); tv.position.set(1.5, 0, -.8); tv.rotation.y = .18; scene.add(tv);
  const dark = new THREE.MeshStandardMaterial({ color: 0x171b21, metalness: .65, roughness: .33 });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.575, 4.5, .18), dark);
  chassis.position.y = 2.61; chassis.castShadow = true; tv.add(chassis);
  const texture = new THREE.VideoTexture(movie); texture.colorSpace = THREE.SRGBColorSpace;
  poster.colorSpace = THREE.SRGBColorSpace;
  const picture = new THREE.Mesh(new THREE.PlaneGeometry(2.475, 4.4), new THREE.MeshBasicMaterial({ map: poster, toneMapped: false }));
  picture.position.set(0, 2.61, .095); tv.add(picture);
  const setVideo = () => { picture.material.map = texture; picture.material.needsUpdate = true; };
  movie.addEventListener("playing", setVideo); if (!movie.paused) setVideo();
  for (const x of [-.85, .85]) {
    const stand = new THREE.Mesh(new THREE.BoxGeometry(.08, .37, .7), dark);
    stand.position.set(x, .18, 0); stand.castShadow = true; tv.add(stand);
  }
  const led = new THREE.Mesh(new THREE.SphereGeometry(.018, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff4b24 }));
  led.position.set(1.13, .38, .1); tv.add(led);

  const monkey = gltf.scene;
  monkey.position.set(-1.65, 0, .8); monkey.rotation.y = 1.45;
  monkey.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true; object.receiveShadow = true;
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        if (material instanceof THREE.MeshStandardMaterial) { material.roughness = .94; material.metalness = 0; }
      }
    }
  });
  scene.add(monkey);
  const mixer = new THREE.AnimationMixer(monkey);
  const actions = ["Excited_Rocking", "Quiet_Breathing", "Curious_Head_Tilt"].map(name => { const clip = THREE.AnimationClip.findByName(gltf.animations, name); if (!clip) throw new Error(`Missing idle: ${name}`); return mixer.clipAction(clip); });
  actions[0].play();
  let activeIdle = 0;
  let elapsed = 0;
  let reactionTime = 0;
  let view: View = "room";
  let visible = true;
  let alive = true;
  let frame = 0;
  let previous = performance.now();
  let dragAngle = 0;
  let dragStart: { x: number; y: number; angle: number } | undefined;
  let dragged = false;
  const pointer = new THREE.Vector2();
  const home = new THREE.Vector3();
  const target = new THREE.Vector3();
  const currentTarget = new THREE.Vector3();
  const desiredCamera = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();

  const compose = () => {
    const mobile = camera.aspect < .85;
    tv.position.x = mobile ? .8 : 1.5;
    monkey.position.x = mobile ? -1.35 : -1.65;
    if (view === "monkey") { home.set(.6, 2.25, mobile ? 6.5 : 5.5); target.set(monkey.position.x, 1.2, .8); }
    else if (view === "film") { home.set(mobile ? 1.7 : 2.7, 2.7, mobile ? 8.8 : 7.2); target.set(tv.position.x, 2.6, -.8); }
    else { home.set(mobile ? 2.7 : 4.4, mobile ? 4 : 3.35, mobile ? 13.8 : 8.5); target.set(mobile ? .25 : -.1, mobile ? 2 : 1.9, .1); }
    camera.fov = mobile ? 43 : 38; camera.updateProjectionMatrix();
  };
  const selectView = (selected: View) => {
    view = selected; dragAngle = 0; compose(); onView(selected);
    if (motion.matches) { camera.position.copy(home); currentTarget.copy(target); camera.lookAt(target); monkey.rotation.y = selected === "monkey" ? .35 : 1.45; }
  };
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect(); renderer.setSize(width, height, false);
    camera.aspect = width / height; compose(); camera.position.copy(home); currentTarget.copy(target); camera.lookAt(target);
  };
  const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); visibility.observe(canvas);
  const react = () => { reactionTime = 3.2; if (motion.matches) { selectView("monkey"); return; } actions[0].setEffectiveTimeScale(1.7); };
  const viewEvent = (event: Event) => {
    const selected = (event as CustomEvent<View>).detail;
    if (["room", "monkey", "film"].includes(selected)) selectView(selected);
  };
  const move = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width - .5, (event.clientY - bounds.top) / bounds.height - .5);
    if (dragStart) {
      const dx = event.clientX - dragStart.x;
      dragged ||= Math.hypot(dx, event.clientY - dragStart.y) > 6;
      dragAngle = THREE.MathUtils.clamp(dragStart.angle - dx / bounds.width * 1.8, -.5, .5);
    } else {
      raycaster.setFromCamera(new THREE.Vector2(pointer.x * 2, -pointer.y * 2), camera);
      canvas.style.cursor = raycaster.intersectObjects([monkey, tv], true).length ? "pointer" : "grab";
    }
  };
  const down = (event: PointerEvent) => { dragStart = { x: event.clientX, y: event.clientY, angle: dragAngle }; dragged = false; canvas.setPointerCapture(event.pointerId); canvas.style.cursor = "grabbing"; };
  const up = (event: PointerEvent) => {
    if (!dragged && dragStart) {
      const bounds = canvas.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1), camera);
      if (raycaster.intersectObject(monkey, true).length) react();
      else if (raycaster.intersectObject(tv, true).length) selectView(view === "film" ? "room" : "film");
    }
    dragStart = undefined; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); canvas.style.cursor = "grab";
  };
  const cancel = () => { dragStart = undefined; pointer.set(0, 0); };
  const contextLost = (event: Event) => { event.preventDefault(); alive = false; onFallback(); };
  canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", cancel); canvas.addEventListener("pointerleave", cancel);
  canvas.addEventListener("screening:view", viewEvent); canvas.addEventListener("screening:react", react); canvas.addEventListener("webglcontextlost", contextLost);
  const render = (now: number) => {
    if (!alive) return;
    frame = requestAnimationFrame(render);
    if (!visible || document.hidden) { previous = now; return; }
    if (now - previous < 1000 / 30) return;
    const dt = Math.min((now - previous) / 1000, .05); previous = now;
    if (!motion.matches) {
      const moving = !movie.paused || reactionTime > 0;
      if (moving) {
        elapsed += dt; mixer.update(dt);
        reactionTime = Math.max(0, reactionTime - dt);
        const nextIdle = reactionTime > 0 || elapsed % 28 < 16 ? 0 : elapsed % 28 < 22 ? 1 : 2;
        if (nextIdle !== activeIdle) { actions[nextIdle].reset().setEffectiveWeight(1).play(); actions[activeIdle].crossFadeTo(actions[nextIdle], .8, true); activeIdle = nextIdle; }
        if (!reactionTime) actions[0].setEffectiveTimeScale(1);
      }
      monkey.rotation.y = THREE.MathUtils.lerp(monkey.rotation.y, view === "monkey" || reactionTime > 0 ? .35 : 1.45, 1 - Math.exp(-dt * 3));
    }
    desiredCamera.copy(home).sub(target).applyAxisAngle(THREE.Object3D.DEFAULT_UP, dragAngle).add(target);
    if (!motion.matches && !dragStart) { desiredCamera.x += pointer.x * .14; desiredCamera.y -= pointer.y * .08; }
    camera.position.lerp(desiredCamera, motion.matches ? 1 : 1 - Math.exp(-dt * 4));
    currentTarget.lerp(target, motion.matches ? 1 : 1 - Math.exp(-dt * 4)); camera.lookAt(currentTarget);
    renderer.render(scene, camera);
  };
  renderer.render(scene, camera); onReady(); frame = requestAnimationFrame(render);
  return () => {
    alive = false; cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect();
    movie.removeEventListener("playing", setVideo);
    canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", cancel); canvas.removeEventListener("pointerleave", cancel);
    canvas.removeEventListener("screening:view", viewEvent); canvas.removeEventListener("screening:react", react); canvas.removeEventListener("webglcontextlost", contextLost);
    mixer.stopAllAction(); mixer.uncacheRoot(monkey);
    const textures = new Set<THREE.Texture>([texture, poster]); const materials = new Set<THREE.Material>();
    scene.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) { materials.add(material); for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value); }
    });
    textures.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); renderer.dispose();
  };
}
