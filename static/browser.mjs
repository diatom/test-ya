import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
const {E} = p.Ren.native()

document.addEventListener("DOMContentLoaded", function() {
    const slidesWrap = document.querySelector('.slides-wrap');
    const slides = document.querySelectorAll('.slide-players');
    const prevButton = document.getElementById('arrow-left');
    const nextButton = document.getElementById('arrow-right');
    const sliderNum = document.querySelector('.slider-num');
    const totalSlides = slides.length;
    let slideInterval;

    let visibleSlides;
    
    function updateVisibleSlides() {
        const containerWidth = document.querySelector('.slides-container').offsetWidth;
        if (containerWidth >= 1222) {
            visibleSlides = 3; // Если ширина контейнера 1222px или больше
        } else if (containerWidth >= 830) {
            visibleSlides = 2; // Если ширина контейнера от 830px до 1219px
        } else if (containerWidth >= 420) {
            visibleSlides = 1; // Если ширина контейнера от 420px до 829px
        } else {
            visibleSlides = 0; // Если ширина контейнера меньше 420px
        }
    }

    // Инициализация при загрузке страницы
    updateVisibleSlides();
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', updateVisibleSlides);
    
    let currentSlideGroup = 0; // Индекс группы слайдов

    function updateSliderNum() {
        sliderNum.textContent = (currentSlideGroup + 1) + ' / ' + Math.ceil(totalSlides / visibleSlides);
    }

    function goToSlide(groupIndex) {
        slidesWrap.style.transform = 'translateX(' + (-groupIndex * (100 / Math.ceil(totalSlides / visibleSlides))) + '%)';
        currentSlideGroup = groupIndex;
        updateSliderNum();
    }

    function nextSlide() {
        const totalGroups = Math.ceil(totalSlides / visibleSlides); // Общее количество групп слайдов
        currentSlideGroup = (currentSlideGroup + 1) % totalGroups; // Переход к следующей группе
        goToSlide(currentSlideGroup);
    }

    function prevSlide() {
        const totalGroups = Math.ceil(totalSlides / visibleSlides); // Общее количество групп слайдов
        currentSlideGroup = (currentSlideGroup - 1 + totalGroups) % totalGroups; // Переход к предыдущей группе
        goToSlide(currentSlideGroup);
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
    
    // Инициализация номера слайда
    updateSliderNum();
});