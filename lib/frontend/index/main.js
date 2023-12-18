import setAsScreenSize from './../utils/screenHeight.js';
import * as THREE from '/three/build/three.module.js';
import { OrbitControls } from '/three/examples/jsm/controls/OrbitControls.js';
// Set up canvas
const aspectRatio = window.innerWidth / window.innerHeight;
const canvasContainer = document.querySelector('#canvas-container');
if (!canvasContainer)
    throw Error('A canvas container must be defined');
const renderer = new THREE.WebGLRenderer();
const setCanvasSize = () => {
    renderer.setSize(window.innerWidth - 15, window.innerHeight);
};
canvasContainer.appendChild(renderer.domElement);
// Establish Canvas and container's sizes
window.addEventListener('resize', () => {
    setCanvasSize();
    setAsScreenSize();
});
setCanvasSize();
setAsScreenSize();
// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper();
//scene.add(axesHelper);
scene.add(gridHelper);
//camera.rotation.y = Math.PI / 2;
camera.position.set(4, 4, 4);
orbit.update();
// Geometry
const sphereGeometry = new THREE.SphereGeometry(3);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: "#7f002d", wireframe: false });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = -1;
scene.add(sphere);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
// Light
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.y = 5;
spotLight.angle = 0.6;
spotLight.intensity = 100;
spotLight.penumbra = 1;
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);
ambientLight.intensity = 0;
// ANIMATE
plane.rotation.x = -Math.PI / 2;
const animate = (time) => {
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);
//# sourceMappingURL=main.js.map