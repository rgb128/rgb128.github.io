'use strict';

const SMALL = .01;
const BIG = .4;

const WIDTH = 256;
const HEIGHT = 256;
const LEFT_RATIO = 1 - SMALL;
const TOP_RATIO = 1 - BIG;
const RIGHT_RATIO = BIG;
const BOTTOM_RATIO = SMALL;
const STOPS = 1000;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('favicon-canvas');

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');


// Gradient
const gradient = context.createLinearGradient(0, HEIGHT,  WIDTH, 0);
for(let i = 0; i <= STOPS; i++) {
    const fraction = i / STOPS;
    gradient.addColorStop(fraction, `hsl(${(fraction * 360)}, 100%, 50%)`);
}
context.fillStyle = gradient;
context.fillRect(0, 0, WIDTH, HEIGHT);




// Fill
context.fillStyle = '#808080';
context.beginPath();
context.moveTo(0, 0);
context.lineTo(WIDTH * TOP_RATIO, 0);
context.lineTo(0, HEIGHT * LEFT_RATIO);
context.lineTo(0, 0);
context.fill();
context.beginPath();
context.moveTo(WIDTH, HEIGHT);
context.lineTo(WIDTH, HEIGHT * RIGHT_RATIO);
context.lineTo(WIDTH * BOTTOM_RATIO, HEIGHT);
context.lineTo(WIDTH, HEIGHT);
context.fill();


