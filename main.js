//IMPORTS
import "./style.css";
import { lorenzAttractorClass } from "./lorenzAttractorClass";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
const lorentz = new lorenzAttractorClass();
//CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(0, 20, 100);

//RENDERER
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//HELPER
const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//ADDS LORENTZ GROUP AND ALL ITS POINTS
const allPoints = new THREE.Group();
scene.add(allPoints);

//MAIN LOOP
controls.update();
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  lorentz.draw();
  allPoints.add(lorentz.getLine());

  renderer.render(scene, camera);
}

animate();
