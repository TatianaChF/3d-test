import * as THREE from 'three';
import './style.css';
import {createSvgCircle} from "./objects/svgCircle.js";
import {createCube} from "./objects/cube.js";
import {createLight} from "./objects/light.js";
import {startColor, startPositionCube1X, startPositionCube2X} from "./constants.js";
import {toggleState} from "./animation.js";
import {setupCamera, setupRenderer, setupResizeHandler, setupScene} from "./scene/sceneSetup.js";

function init() {
    const leftHalf = document.getElementById('left-half');
    const rightHalf = document.getElementById('right-half');
    const btn = document.getElementById('button');

    const scene = setupScene();
    const camera = setupCamera();
    const renderer = setupRenderer(leftHalf);

    const cubeGroup = new THREE.Group();

    const cube1 = createCube(startColor);
    cube1.position.x = startPositionCube1X;
    cubeGroup.add(cube1);

    const cube2 = createCube(startColor);
    cube2.position.x = startPositionCube2X;
    cubeGroup.add(cube2);

    const light1 = createLight(2, 3, 4);
    const light2 = createLight(-2, 3, 4);

    const ambientLight = new THREE.AmbientLight(0x404040);

    scene.add(light1);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(cubeGroup);

    leftHalf.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    const svgCircle = createSvgCircle(rightHalf);
    const svgCircleElement = svgCircle.querySelector('svg circle');

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleState(cube1, cube2, svgCircleElement, renderer, scene, camera);
    });

    setupResizeHandler(leftHalf, camera, renderer, scene);
}

window.addEventListener('load', init);
