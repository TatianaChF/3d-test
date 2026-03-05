import * as THREE from 'three';
import './style.css';
import {createSvgCircle} from "./objects/svgCircle.js";
import {createCube} from "./objects/cube.js";
import {createLight} from "./objects/light.js";

let isRedState = false;

function init() {
    const leftHalf = document.getElementById('left-half');
    const rightHalf = document.getElementById('right-half');
    const btn = document.getElementById('button');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 500);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(leftHalf.clientWidth, leftHalf.clientHeight);

    const cube1 = createCube('#00FF00');
    cube1.position.x = -2;

    const cube2 = createCube('#00FF00');
    cube2.position.x = 2;

    const light1 = createLight(2, 3, 4);
    const light2 = createLight(-2, 3, 4);

    const ambientLight = new THREE.AmbientLight(0x404040);

    scene.add(light1);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(cube1);
    scene.add(cube2);

    leftHalf.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    const svgCircle = createSvgCircle(rightHalf);

    function toggleState(cube1, cube2, svgCircle) {
        isRedState = !isRedState;

        if (isRedState) {
            cube1.position.x = -1;
            cube2.position.x = 1;

            cube1.material.color.setHex(0xff0000);
            cube2.material.color.setHex(0xff0000);

            const svg = svgCircle.querySelector('svg circle');
            if (svg) svg.setAttribute('fill', 'red');
        } else {
            cube1.position.x = -2;
            cube2.position.x = 2;

            cube1.material.color.setHex(0x00ff00);
            cube2.material.color.setHex(0x00ff00);

            const svg = svgCircle.querySelector('svg circle');
            if (svg) svg.setAttribute('fill', '#00FF00');
        }

        renderer.render(scene, camera);
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleState(cube1, cube2, svgCircle);
    });

    window.addEventListener('resize', () => {
        const width = leftHalf.clientWidth;
        const height = leftHalf.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

window.addEventListener('load', init);
