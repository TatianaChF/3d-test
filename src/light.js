import * as THREE from "three";

export function createLight(x, y, z) {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(x, y, z);

    return light;
}