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

//ADD SPHERE FUNCTION

const allPoints = new THREE.Group();
let prevVect = new THREE.Vector3(0, 0, 0);
const addPoint = () => {
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pointVec = [];
  pointVec.push(prevVect);
  lorentz.draw();
  pointVec.push(new THREE.Vector3(lorentz.getX, lorentz.getY, lorentz.getZ));
  prevVect = new THREE.Vector3(lorentz.getX, lorentz.getY, lorentz.getZ);

  console.log(pointVec);
  const geometry = new THREE.BufferGeometry().setFromPoints(pointVec);
  const line = new THREE.Line(geometry, material);

  scene.add(line);
};

scene.add(allPoints);

//MAIN LOOP
controls.update();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  lorentz.draw();
  addPoint();
  //console.log(lorentz.dt);
  renderer.render(scene, camera);
}

animate();
