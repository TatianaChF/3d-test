import * as THREE from "three";

export function createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({color: '#00FF00'});

    return new THREE.Mesh(geometry, material);
}