import * as THREE from "three";

export function createLight() {
    const light = new THREE.DirectionalLight();
    light.position.set(0, 2, 2);

    return light;
}