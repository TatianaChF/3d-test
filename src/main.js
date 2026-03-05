import * as THREE from 'three';
import {createSvgCircle} from "./svgCircle.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({color: '#00FF00'});
const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);

const light = new THREE.DirectionalLight();
light.position.set(0, 2, 2);
scene.add(light);

cube1.position.x = -1;
cube2.position.x = 1.5;

scene.background = new THREE.Color('white');

scene.add(cube1);
scene.add(cube2);

cube1.rotation.y = -0.5;
cube2.rotation.y = -0.5;
cube1.rotation.x = 0.2;
cube2.rotation.x = 0.2;

camera.position.z = 5;

createSvgCircle();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
