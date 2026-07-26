'use strict';

// Colors: '#3a6ea5', '#bca48a', '#a12d2f', '#555d63', '#38e0a3', '#e2c044', '#2b5f9e', '#70414d', '#8a9ba8', '#c47c1b'

const PIECES = [
    {
        name: 'divide\'n\'unite',
        description: 'divide and multiply',
        link: 'https://rgb128.github.io/divide-n-unite',
        imageSrc: 'images/divide-n-unite.png',
        backgroundColor: '#ff1493',
    },
    {
        name: 'window',
        description: 'look what is outside the window',
        link: 'https://rgb128.github.io/window',
        imageSrc: 'images/window.png',
        backgroundColor: '#87a9d4',
    },
    {
        name: 'square',
        description: 'a square is always a square',
        link: 'https://rgb128.github.io/square',
        imageSrc: 'images/square.png',
        backgroundColor: '#7c6a8e',
    },
    {
        name: 'triangle',
        description: 'a triangle is not always a triangle',
        link: 'https://rgb128.github.io/triangle',
        imageSrc: 'images/triangle.png',
        backgroundColor: '#8b575f',
    },
    {
        name: 'night book',
        description: 'what do you read at night',
        link: 'https://rgb128.github.io/NightBook',
        imageSrc: 'images/night-book.png',
        backgroundColor: '#00ffff',
    },
    {
        name: 'between the lines',
        description: 'Read between the lines. Look deeper',
        link: 'https://rgb128.github.io/between-the-lines',
        imageSrc: 'images/between-the-lines.png',
        backgroundColor: '#9e400d',
    },
    {
        name: 'iron curtain',
        description: 'in visible',
        link: 'https://rgb128.github.io/IronCurtain',
        imageSrc: 'images/iron-curtain.png',
        backgroundColor: '#808080',
    },
    {
        name: 'Penrose',
        description: 'Tile your history',
        link: 'https://rgb128.github.io/Penrose1',
        imageSrc: 'images/penrose.png',
        backgroundColor: '#7c0d9e',
    },
    {
        name: 'Plus',
        description: 'Do it yourself',
        link: 'https://rgb128.github.io/plus',
        imageSrc: 'images/5.png',
        backgroundColor: '#756464',
    },
    {
        name: 'Exhibition 1',
        description: 'Our first exhibition',
        link: 'https://rgb128.github.io/Exhibition1',
        imageSrc: 'images/4.webp',
        backgroundColor: '#9e0d39',
    },
    {
        name: 'Your Pack',
        description: 'pack yourself',
        link: 'https://rgb128.github.io/YourPack',
        imageSrc: 'images/your-pack.png',
        backgroundColor: '#BCA48A',
    },
    {
        name: 'clock time',
        description: 'You make your time',
        link: 'https://rgb128.github.io/ClockTime',
        imageSrc: 'images/3.mp4',
        backgroundColor: '#416b3b',
    },
    {
        name: 'color of fall',
        description: 'What is the color of fall?',
        link: 'https://rgb128.github.io/ColorOfFall',
        imageSrc: 'images/2.png',
        backgroundColor: '#907018',
    },
    // {
    //     name: 'Прожектор Перестройки',
    //     description: 'A viewer does impact',
    //     link: 'http://prozhektorperestroiki.herokuapp.com',
    //     imageSrc: 'images/1.webp',
    //     backgroundColor: '#133e87',
    // },
];

const MIN_ROTATE_DEG = -2;
const MAX_ROTATE_DEG = 2;
const PIECE_DARKER_COEFFICIENT = 1.8;

function createElem(elemName, classList, innerText) {
    const element = document.createElement(elemName);
    if (classList?.length) element.classList.add(...classList);
    if (innerText) element.innerText = innerText;
    return element;
}
function getRandomRotation() {
  return Math.random() * (MAX_ROTATE_DEG - MIN_ROTATE_DEG) + MIN_ROTATE_DEG;
}
function darkenHexColor(hexColor) {
  // Remove the '#' if it's there
  let hex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;

  // Handle shorthand 3-digit hex codes by expanding them
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  // Ensure we have a valid 6-digit hex code before proceeding
  if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) {
    console.error('Invalid hex color format provided.', hex);
    return hexColor; // Return original color on error
  }
  
  // Convert the 6-digit hex into a big integer
  const bigint = parseInt(hex, 16);

  // Extract the R, G, B components using bitwise operations
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // 2. --- DARKEN THE COLOR ---

  // Divide each component by the darkening factor
  // Math.floor ensures we get an integer value
  r = Math.floor(r / PIECE_DARKER_COEFFICIENT);
  g = Math.floor(g / PIECE_DARKER_COEFFICIENT);
  b = Math.floor(b / PIECE_DARKER_COEFFICIENT);

  // 3. --- FORMAT THE OUTPUT ---

  // Convert the new R, G, B values back to hex
  // .padStart(2, '0') ensures that a single-digit hex (like 'A') becomes '0A'
  const newR = r.toString(16).padStart(2, '0');
  const newG = g.toString(16).padStart(2, '0');
  const newB = b.toString(16).padStart(2, '0');

  // Reassemble the hex string and return it
  return `#${newR}${newG}${newB}`;
}



function generateFirstPiece(piece, container) {
    const picture = createElem('picture', ['newest_preview']);
    const img = createElem('img', ['newest_preview_img'])
    img.src = piece.imageSrc;
    img.alt = piece.name;
    picture.appendChild(img);
    container.appendChild(picture);
    
    const h3 = createElem('h3', ['newest_title'], piece.name);
    container.appendChild(h3);

    const p = createElem('p', ['newest_description'], piece.description);
    container.appendChild(p);
    
    const exploreDiv = createElem('div', ['newest_link']);
    const exploreLink = createElem('a', [], 'explore');
    exploreLink.href = piece.link;
    exploreDiv.appendChild(exploreLink);
    container.appendChild(exploreDiv);
}
function generateAPiece(piece) {
    const pieceLinkContainer = createElem('a', ['point_of_art', 'animb']);
    pieceLinkContainer.style.background = piece.backgroundColor;
    pieceLinkContainer.style.transform = `rotate(${getRandomRotation()}deg)`;
    pieceLinkContainer.href = piece.link;

    const picture = createElem('picture', ['point_of_art_preview']);
    if (piece.imageSrc.endsWith('.mp4')) {
        const video = createElem('video')
        video.src = piece.imageSrc;
        video.alt = piece.name;
        video.playsinline = '1';
        video.autoplay = '1';
        video.loop = '1';
        picture.appendChild(video);
    } else {
        const img = createElem('img', ['point_of_art_preview_img'])
        img.src = piece.imageSrc;
        img.alt = piece.name;
        picture.appendChild(img);
    }
    
    pieceLinkContainer.appendChild(picture);
    
    const h3 = createElem('h3', ['point_of_art_header'], piece.name);
    h3.style.background = darkenHexColor(piece.backgroundColor);
    pieceLinkContainer.appendChild(h3);

    return pieceLinkContainer;
}

const newPieceContainer = document.querySelector('#body > .main > .newest.animb');
const galleryContainer = document.querySelector('#body > .main > .gallery');

newPieceContainer.innerHTML = '';
galleryContainer.innerHTML = '';

generateFirstPiece(PIECES[0], newPieceContainer);

for (let i = 1; i < PIECES.length; i-=-1) {
    const pieceElement = generateAPiece(PIECES[i]);
    galleryContainer.appendChild(pieceElement);
}
