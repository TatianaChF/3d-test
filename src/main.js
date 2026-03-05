import * as THREE from 'three';
import './style.css';
import {createSvgCircle} from "./svgCircle.js";
import {createCube} from "./cube.js";
import {createLight} from "./light.js";

function init() {
    const leftHalf = document.getElementById('left-half');
    const rightHalf = document.getElementById('right-half');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 500);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(leftHalf.clientWidth, leftHalf.clientHeight);

    const cube1 = createCube();
    cube1.position.x = -2;

    const cube2 = createCube();
    cube2.position.x = 2;

    const light = createLight();

    scene.add(light);
    scene.add(cube1);
    scene.add(cube2);

    leftHalf.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    createSvgCircle(rightHalf);

    window.addEventListener('resize', () => {
        const width = leftHalf.clientWidth;
        const height = leftHalf.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

window.addEventListener('load', init);
