import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
const {E} = p.Ren.native()

document.addEventListener("DOMContentLoaded", function() {
    const slidesWrap = document.querySelector('.slides-wrap');
    const slides = document.querySelectorAll('.slide-players');
    const prevButton = document.getElementById('arrow-left');
    const nextButton = document.getElementById('arrow-right');
    const sliderNum = document.querySelector('.slider-num');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let slideInterval;

    function updateSliderNum() {
        sliderNum.textContent = (currentSlide + 1) + ' / ' + totalSlides;
    }

    function goToSlide(n) {
        slidesWrap.style.transform = 'translateX(' + (-n * 100) + '%)';
        currentSlide = n;
        updateSliderNum();
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    nextButton.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });

    prevButton.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }

    slideInterval = setInterval(nextSlide, 4000);
    updateSliderNum();
});