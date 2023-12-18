import setAsScreenSize   from './../utils/screenHeight.js';
import * as THREE        from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader }    from 'three/examples/jsm/loaders/GLTFLoader.js';

// Set up canvas

const aspectRatio = window.innerWidth / window.innerHeight;

const canvasContainer = document.querySelector('#canvas-container') as HTMLDivElement;

if (!canvasContainer) throw Error('A canvas container must be defined');

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

const setCanvasSize = () => {
    renderer.setSize(window.innerWidth - 15, window.innerHeight);
}

canvasContainer.appendChild(renderer.domElement);

// Establish Canvas and container's sizes

window.addEventListener('resize',() => {
    setCanvasSize()
    setAsScreenSize()
})

setCanvasSize()
setAsScreenSize()


// Set up scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    aspectRatio,
    0.1,
    1000
)

const orbit = new OrbitControls(camera,renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper();

//scene.add(axesHelper);
//scene.add(gridHelper);

camera.rotation.y = Math.PI / 2;
camera.position.set(3,1,3);

orbit.update()

// Geometry

const planeGeometry = new THREE.PlaneGeometry(8,8);
const planeMaterial = new THREE.MeshStandardMaterial({ color : 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

scene.add(plane);


// Light

const spotLight = new THREE.SpotLight(0xFFFFFF);

spotLight.position.y = 5;
spotLight.position.x = 4;
spotLight.angle = 0.7;
spotLight.intensity = 100;
spotLight.penumbra = 1;
spotLight.castShadow = true;

scene.add(spotLight);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);

scene.add(ambientLight);

ambientLight.intensity = 0.1;

// Models

const ModelLoader = new GLTFLoader();

ModelLoader.load(
    './assets/models/car/scene.gltf',
    (gltf) => {

        var car = gltf.scene;

        scene.add(car);

        setInterval(() => {
            car.rotation.y   += 0.005;
            plane.rotation.z += 0.005;
            car.scale.set(1.5,1.5,1.5);

        },10)
        
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + ' % loaded');
    }, 
    (err) => {
        console.error(err);
    }
);


// ANIMATE

plane.rotation.x = -Math.PI / 2;

const animate = (time :number) => {

    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)

