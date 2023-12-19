import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Renderer, Scene, Camera } from '../utils/threeComponents.js';
//scene.add(gridHelper);
Renderer.setSize(window.innerWidth - 15, window.innerHeight);
Renderer.setClearColor(new THREE.Color(0x28F3E3));
Camera.position.set(-1, 1, 5);
//Camera.rotation.y = Math.PI / 2;
// Geometry
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
const textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('./assets/textures/mosaic.png');
planeMaterial.map = texture;
plane.receiveShadow = true;
// Background
var texture = textureLoader.load('./assets/textures/bg2.png');
const bgMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide, // Show the texture on the inside of the sphere
});
const bgGeometry = new THREE.SphereGeometry(500, 60, 40); // Adjust the radius and segments as needed
const backgroundSphere = new THREE.Mesh(bgGeometry, bgMaterial);
Scene.add(backgroundSphere);
Scene.add(plane);
// Light
const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.y = 5;
spotLight.position.z = 5;
spotLight.angle = 0.7;
spotLight.intensity = 100;
spotLight.penumbra = 1;
spotLight.castShadow = true;
Scene.add(spotLight);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
Scene.add(ambientLight);
ambientLight.intensity = 0.5;
// Models
const ModelLoader = new GLTFLoader();
var time = 0;
ModelLoader.load('./assets/models/car/scene.gltf', (gltf) => {
    var car = gltf.scene;
    car.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    Scene.add(car);
    setInterval(() => {
        backgroundSphere.rotation.y += 0.005;
        car.rotation.y += 0.005;
        plane.rotation.z += 0.005;
        car.scale.set(1.5, 1.5, 1.5);
        time += 0.1;
    }, 10);
}, (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + ' % loaded');
}, (err) => {
    console.error(err);
});
// ANIMATE
plane.rotation.x = -Math.PI / 2;
const animate = (time) => {
    Renderer.render(Scene, Camera);
};
Renderer.setAnimationLoop(animate);
//# sourceMappingURL=main.js.map