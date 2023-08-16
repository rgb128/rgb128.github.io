'use strict';

const SMALL = .01;
const BIG = .4;

const SIZE = 512;
const LEFT_RATIO = 1 - SMALL;
const TOP_RATIO = 1 - BIG;
const RIGHT_RATIO = BIG;
const BOTTOM_RATIO = SMALL;
const STOPS = 1000;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('favicon-canvas');
canvas.width = SIZE;
canvas.height = SIZE;

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');


// Gradient
const gradient = context.createLinearGradient(0, SIZE,  SIZE, 0);
for(let i = 0; i <= STOPS; i++) {
    const fraction = i / STOPS;
    gradient.addColorStop(fraction, `hsl(${(fraction * 360)}, 100%, 50%)`);
}
context.fillStyle = gradient;
context.fillRect(0, 0, SIZE, SIZE);



// Fill
context.fillStyle = '#808080';
context.beginPath();
context.moveTo(0, 0);
context.lineTo(SIZE * TOP_RATIO, 0);
context.lineTo(0, SIZE * LEFT_RATIO);
context.lineTo(0, 0);
context.fill();
context.beginPath();
context.moveTo(SIZE, SIZE);
context.lineTo(SIZE, SIZE * RIGHT_RATIO);
context.lineTo(SIZE * BOTTOM_RATIO, SIZE);
context.lineTo(SIZE, SIZE);
context.fill();


// Crop
const imageData = context.getImageData(0, 0, SIZE, SIZE).data;
for (let i = 0; i < (SIZE * SIZE) * 4; i += 4) {
    const pxI = i / 4;
    const x = (pxI % SIZE) - SIZE / 2;
    const y = Math.floor(pxI / SIZE) - SIZE / 2;

    // console.log(x, y);

    // const r = imageData[i];
    // const g = imageData[i + 1];
    // const b = imageData[i + 2];
    // const a = imageData[i + 3];

    const lengthToCenter = Math.sqrt(x * x + y * y);

    const sin = y / lengthToCenter;
    const cos = x / lengthToCenter;
    const quater = getQuater(sin, cos)


    // SP = showing point
    const spX = -SIZE / 2;
    const spY = SIZE / 2;
    const spDistance = Math.sqrt((x - spX) * (x - spX) + (y - spY) * (y - spY));
    const spMax = Math.sqrt(2) * SIZE;
    const opacity = map(spDistance, 0, spMax, 255, 0);
    imageData[i + 3] = opacity;
    // console.log(opacity);
    
    if (lengthToCenter > SIZE / 2 && (quater === 0 || quater === 2)) {
        imageData[i + 3] = 0;
        continue;
    }
}
context.putImageData(new ImageData(imageData, SIZE, SIZE), 0, 0);



function getQuater(sin, cos) {
    // Not sure it mathematically correct
    if (sin > 0 && cos > 0) {
        return 0;
    }
    if (sin > 0 && cos < 0) {
        return 1;
    }
    if (sin < 0 && cos < 0) {
        return 2;
    }
    if (sin < 0 && cos > 0) {
        return 3;
    }

    return -1; // We are on an axis.
}
function map(num, frombottom, fromtop, tobottom, totop) {
    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}

console.log('Ready');

