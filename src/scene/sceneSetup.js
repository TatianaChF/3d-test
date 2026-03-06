import * as THREE from "three";

export function setupScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    return scene;
}

export function setupCamera() {
    const fov = 75;
    const aspect = 1;
    const near = 0.1;
    const far = 500;

    const cameraPositionZ = 5;

    const camera = new THREE.PerspectiveCamera(
        fov,
        aspect,
        near,
        far
    );
    camera.position.z = cameraPositionZ;

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