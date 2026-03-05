import * as THREE from 'three';
import './style.css';
import {createSvgCircle} from "./objects/svgCircle.js";
import {createCube} from "./objects/cube.js";
import {createLight} from "./objects/light.js";

let isRedState = false;
let isAnimating = false;
let animationProgress = 0;

const startX1 = -2;
const startX2 = 2;
const endX1 = -1;
const endX2 = 1;

const startColor = new THREE.Color(0x00ff00);
const endColor = new THREE.Color(0xff0000);

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

    const cubesGroup = new THREE.Group();

    const cube1 = createCube(startColor);
    cube1.position.x = startX1;
    cubesGroup.add(cube1);

    const cube2 = createCube(startColor);
    cube2.position.x = startX2;
    cubesGroup.add(cube2);

    const light1 = createLight(2, 3, 4);
    const light2 = createLight(-2, 3, 4);

    const ambientLight = new THREE.AmbientLight(0x404040);

    scene.add(light1);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(cubesGroup);

    leftHalf.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    const svgCircle = createSvgCircle(rightHalf);
    const svgCircleElement = svgCircle.querySelector('svg circle');

    function animateTransition() {
        if (!isAnimating) return;

        if (isRedState) {
            animationProgress += 0.02;

            if (animationProgress > 1) {
                animationProgress = 1;
                isAnimating = false;
            }
        } else {
            animationProgress -= 0.02;

            if (animationProgress < 0) {
                animationProgress = 0;
                isAnimating = false;
            }
        }

        cube1.position.x = startX1 + (endX1 - startX1) * animationProgress;
        cube2.position.x = startX2 + (endX2 - startX2) * animationProgress;

        const currentColor = startColor.clone().lerp(endColor, animationProgress);

        cube1.material.color.copy(currentColor);
        cube2.material.color.copy(currentColor);

        if (svgCircleElement) {
            const r = Math.floor(0 + 255 * animationProgress);
            const g = Math.floor(255 - 255 * animationProgress);
            const b = 0;
            svgCircleElement.setAttribute('fill', `rgb(${r}, ${g}, ${b})`);
        }

        renderer.render(scene, camera);

        if (isAnimating) requestAnimationFrame(animateTransition);
    }

    function toggleState() {
        isRedState = !isRedState;

        if (!isAnimating) {
            isAnimating = true;
            animateTransition();
        }
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleState();
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
