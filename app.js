'use strict';

const galleryArts = document.querySelectorAll('.animb');

function checkSimpleDiv() {
    const div = document.getElementById('simple');
    if (!div || div.classList.contains('removing')) {
        window.removeEventListener('scroll', checkSimpleDiv);
        return;
    }
    simple.classList.add('removing');
    setTimeout(() => {
        simple.remove();
    }, 1000);
}
window.addEventListener('scroll', checkSimpleDiv);

function checkGalleryDiv() {
    for (const artPreview of galleryArts) {
        const { offsetTop, offsetHeight } = artPreview;
        const screenHeight = document.documentElement.clientHeight;
        const scrollY = window.scrollY;

        // const isTop = offsetTop + offsetHeight <= scrollY; // Not center
        // const isBottom = offsetTop >= scrollY + screenHeight; // Not center
        const isTop = offsetTop + (offsetHeight / 5) <= scrollY; // Center
        const isBottom = offsetTop >= scrollY + screenHeight - (offsetHeight / 5); // Center
        console.log((isTop ? 'top' : ''), (isBottom ? 'bottom' : ''));

        isTop ? artPreview.classList.add('top') : artPreview.classList.remove('top');
        isBottom ? artPreview.classList.add('bottom') : artPreview.classList.remove('bottom');
    }
    
}
window.addEventListener('scroll', checkGalleryDiv);
