import {endColor, endX1, endX2, startColor, startX1, startX2} from "./constants.js";

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