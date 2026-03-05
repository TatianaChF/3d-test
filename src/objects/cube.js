import * as THREE from "three";

export function createCube(color) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({color: color});

    return new THREE.Mesh(geometry, material);
}