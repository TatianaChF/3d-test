import * as THREE from "three";

export function setupScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    return scene;
}

export function setupCamera() {
    const camera = new THREE.PerspectiveCamera(
        75,
        1,
        0.1,
        500
    );
    camera.position.z = 5;

    return camera;
}

export function setupRenderer(leftHalf) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(leftHalf.clientWidth, leftHalf.clientHeight);

    return renderer;
}

export function setupResizeHandler(leftHalf, camera, renderer, scene) {
    window.addEventListener('resize', () => {
        const width = leftHalf.clientWidth;
        const height = leftHalf.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

        renderer.render(scene, camera);
    });
}