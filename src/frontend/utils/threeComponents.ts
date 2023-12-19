import setAsScreenHeight from './screenHeight.js';

import * as THREE from 'three';

// set renderer

const Renderer = new THREE.WebGLRenderer();

Renderer.shadowMap.enabled = true;
//Renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

// set canvas

const aspectRatio = window.innerWidth / window.innerHeight;

const canvasContainer = document.querySelector('#canvas-container') as HTMLDivElement;

if (!canvasContainer) throw Error('A canvas container must be defined');


canvasContainer.appendChild(Renderer.domElement);

// set canvas dimensions

const setDimensions = () => {
    setAsScreenHeight();
    Renderer.setSize(window.innerWidth - 15, window.innerHeight);
}

window.addEventListener('resize',() => {
    setDimensions();
});

setDimensions();

// set scene

const Scene = new THREE.Scene();

// set camera

const Camera = new THREE.PerspectiveCamera(
    75,
    aspectRatio,
    0.1,
    1000
)

export { Renderer, Scene, Camera }

