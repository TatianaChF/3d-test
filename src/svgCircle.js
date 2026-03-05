export function createSvgCircle() {
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
        <svg width="200" height="200" viewBox="0 0 100 100" 
             style="position: fixed; top: 50%; right: 50px; transform: translateY(-50%);">
            <circle cx="50" cy="50" r="40" fill="#00FF00" />
        </svg>
    `;

    document.body.appendChild(svgContainer);
    return svgContainer;
}