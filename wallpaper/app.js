'use strict';

let currentTimeout = undefined;
const DEFAULT_TIME = 5000;

function rotateAfter(ms) {
    if (currentTimeout !== undefined) window.clearTimeout(currentTimeout);
    if (!ms) { // ms == 0
        document.getElementById('centered').classList.toggle('rotated');
        rotateAfter(DEFAULT_TIME);
    } else {
        currentTimeout = setTimeout(() => {
            document.getElementById('centered').classList.toggle('rotated');
            rotateAfter(DEFAULT_TIME);
        }, ms);
    }
}

rotateAfter(2000);

document.documentElement.onclick = (e) => {
    rotateAfter();
}
