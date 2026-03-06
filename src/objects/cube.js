import * as THREE from "three";
import {startColor} from "../constants.js";

export function createCube(color) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({color: startColor});

    return new THREE.Mesh(geometry, material);
}