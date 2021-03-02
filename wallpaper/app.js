'use strict';

let currentRotated = false;
let currentSide = 0; // 0, 1, 2 .. WORDS.length
let currentTimeout = undefined;
const DEFAULT_TIME = 5000; // rotate every .. ms
const FIRST_TIME = 2000; // rotate at first at .. ms
const WORDS = [
    [ '#', '8', '0', '8', '0', '8', '0' ],
    [ 'С', 'Е', 'Р', 'О', 'С', 'Т', 'Ь' ],
    [ { img: createGhImage() }, 'r', 'g', 'b', '1', '2', '8' ]
];
/** @type {HTMLElement[]} */
const ELEMENTS = Array.from(document.querySelectorAll('#centered > .letter-container > .letter'));

/** @returns {HTMLImageElement} */
function createGhImage() {
    const div = document.createElement('div');
    div.classList.add('letter-image-github');
    div.innerHTML = 'a';
    return div;
}


function rotateAfter(ms) {
    if (currentTimeout !== undefined) window.clearTimeout(currentTimeout);
    if (!ms) { // ms == 0
        rotate();
        rotateAfter(DEFAULT_TIME);
    } else {
        currentTimeout = setTimeout(() => {
            rotate();
            rotateAfter(DEFAULT_TIME);
        }, ms);
    }
}

if (!checkInputDataAlright) throw new Error("Input data is invalid. Check HTML structure and consts");
fill();
rotateAfter(FIRST_TIME);

document.documentElement.onclick = (e) => {
    rotateAfter();
}


/** @returns {boolean} */
function checkInputDataAlright() {
    const wordLength = ELEMENTS.length;
    for (const arr of WORDS) {
        if (arr.length !== wordLength) return false;
    }
    return true;
}
function fill() {
    for (let i = 0; i < ELEMENTS.length; i-=-1) {
        /** @type {HTMLElement} */
        const sideElement = currentRotated ? 
            ELEMENTS[i].querySelector('.side2') :
            ELEMENTS[i].querySelector('.side1');
        if (WORDS[currentSide][i].img) {
            sideElement.innerHTML = '';
            sideElement.appendChild(WORDS[currentSide][i].img);
        } else {
            sideElement.innerHTML = WORDS[currentSide][i];
        }
    }
}

async function rotate() {
    currentRotated = !currentRotated;
    currentSide = (currentSide + 1) % WORDS.length;
    fill();
    if (currentRotated) document.getElementById('centered').classList.add('rotated');
    else document.getElementById('centered').classList.remove('rotated');
}
