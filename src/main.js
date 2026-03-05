import * as THREE from 'three';
import {createSvgCircle} from "./svgCircle.js";
import {createCube} from "./cube.js";
import {createLight} from "./light.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const cube1 = createCube();
cube1.position.x = 1;

const cube2 = createCube();
cube2.position.x = -1;

const light = createLight();

scene.add(light);

scene.add(cube1);
scene.add(cube2);

createSvgCircle();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
