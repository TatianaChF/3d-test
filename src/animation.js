import {
    endColor,
    endPositionCube1X, endPositionCube2X,
    startColor,
    startPositionCube1X, startPositionCube2X,
} from "./constants.js";

let isRedState = false;
let isAnimating = false;
let animationProgress = 0;

function animateTransition(cube1, cube2, svgCircleElement, renderer, scene, camera) {
    if (!isAnimating) return;

    if (!cube1 || !cube2) {
        isAnimating = false;
        return;
    }

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

    cube1.position.x = startPositionCube1X + (endPositionCube1X - startPositionCube1X) * animationProgress;
    cube2.position.x = startPositionCube2X + (endPositionCube2X - startPositionCube2X) * animationProgress;

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

    if (isAnimating) {
        requestAnimationFrame(() => animateTransition(cube1, cube2, svgCircleElement, renderer, scene, camera));
    }
}

export function toggleState(cube1, cube2, svgCircleElement, renderer, scene, camera) {
    isRedState = !isRedState;

    if (!isAnimating) {
        isAnimating = true;
        animateTransition(cube1, cube2, svgCircleElement, renderer, scene, camera);
    }
}