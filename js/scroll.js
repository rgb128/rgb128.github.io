'use strict';

//todo mb fix

(() => {
    const element = document.getElementById('body');

    const galleryArts = document.querySelectorAll('.animb');
    
    function checkSimpleDiv() {
        const div = document.getElementById('simple');
        if (!div || div.classList.contains('removing')) {
            element.removeEventListener('scroll', checkSimpleDiv);
            return;
        }
        simple.classList.add('removing');
        setTimeout(() => {
            simple.remove();
        }, 1000);
    }
    element.addEventListener('scroll', checkSimpleDiv);
    
    function checkGalleryDiv() {
        for (const artPreview of galleryArts) {
            const { offsetTop, offsetHeight } = artPreview;
            const screenHeight = document.documentElement.clientHeight;
            const scrollY = element.scrollY;
    
            const isTop = offsetTop + (offsetHeight / 5) <= scrollY; // Center
            const isBottom = offsetTop >= scrollY + screenHeight - (offsetHeight / 5); // Center
    
            isTop ? artPreview.classList.add('top') : artPreview.classList.remove('top');
            isBottom ? artPreview.classList.add('bottom') : artPreview.classList.remove('bottom');
        }
        
    }
    element.addEventListener('scroll', checkGalleryDiv);
})();

