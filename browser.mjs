import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
const {E} = p.Ren.native()

document.addEventListener("DOMContentLoaded", function() {
    const slidesWrap = document.querySelector('.slides-wrap')
    const slides = document.querySelectorAll('.slide-players')
    const prevButton = document.getElementById('arrow-left')
    const nextButton = document.getElementById('arrow-right')
    const sliderNum = document.querySelector('.slider-num')
    const totalSlides = slides.length
    let slideInterval

    let visibleSlides
    
    function updateVisibleSlides() {
        const containerWidth = document.querySelector('.slides-container').offsetWidth
        if (containerWidth >= 1140) {
            visibleSlides = 3 // Если ширина контейнера 1222px или больше
        } else if (containerWidth >= 788) {
            visibleSlides = 2 // Если ширина контейнера от 830px до 1219px
        } else if (containerWidth >= 394) {
            visibleSlides = 1 // Если ширина контейнера от 420px до 829px
        } else {
            visibleSlides = 1
        }
    }

    // Инициализация при загрузке страницы
    updateVisibleSlides()
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', updateVisibleSlides)
    
    let currentSlideGroup = 0 // Индекс группы слайдов

    function updateSliderNum() {
        sliderNum.textContent = (currentSlideGroup + 1) + ' / ' + Math.ceil(totalSlides / visibleSlides)
    }

    function goToSlide(groupIndex) {
        slidesWrap.style.transform = 'translateX(' + (-groupIndex * (100 / Math.ceil(totalSlides / visibleSlides))) + '%)'
        currentSlideGroup = groupIndex
        updateSliderNum()
    }

    function nextSlide() {
        const totalGroups = Math.ceil(totalSlides / visibleSlides) // Общее количество групп слайдов
        currentSlideGroup = (currentSlideGroup + 1) % totalGroups // Переход к следующей группе
        goToSlide(currentSlideGroup)
    }

    function prevSlide() {
        const totalGroups = Math.ceil(totalSlides / visibleSlides) // Общее количество групп слайдов
        currentSlideGroup = (currentSlideGroup - 1 + totalGroups) % totalGroups // Переход к предыдущей группе
        goToSlide(currentSlideGroup)
    }

    nextButton.addEventListener('click', function() {
        nextSlide()
        resetInterval()
    })

    prevButton.addEventListener('click', function() {
        prevSlide()
        resetInterval()
    })

    function resetInterval() {
        clearInterval(slideInterval)
        slideInterval = setInterval(nextSlide, 4000)
    }

    slideInterval = setInterval(nextSlide, 4000)
    
    // Инициализация номера слайда
    updateSliderNum()
})


window.addEventListener('resize', () => {
    const steps = document.querySelectorAll('.step')
    const dots = document.querySelectorAll('.step-dot')
    const leftArrow = document.getElementById('step-arrow-left')
    const rightArrow = document.getElementById('step-arrow-right')
    let currentStep = 0 // Start with step-1

    if (window.matchMedia('(max-width: 859px)').matches) {
        // Код для выполнения при изменении размера окна меньше 860px
        setStepStyles(currentStep)
        updateUI()

        // Event listeners for navigation arrows
        rightArrow.addEventListener('click', function() {
            if (currentStep < 4) { // Allow switching only up to the last case (dot-5)
                currentStep++
                setStepStyles(currentStep)
                updateUI()
            }
        })

        leftArrow.addEventListener('click', function() {
            if (currentStep > 0) { // Allow switching only down to the first case (dot-1)
                currentStep--
                setStepStyles(currentStep)
                updateUI()
            }
        })

        // Function to set styles based on active dot
        function setStepStyles(index) {
            // Hide all steps initially
            steps.forEach(step => {
                step.style.display = 'none'
            })

            switch (index) {
                case 0: // dot-1 active
                    steps[0].style.gridColumn = '1'
                    steps[0].style.gridRow = '1'
                    steps[0].style.display = 'flex' // Show step-1
                    steps[1].style.gridColumn = '1'
                    steps[1].style.gridRow = '2'
                    steps[1].style.display = 'flex' // Show step-2
                    break
                case 1: // dot-2 active
                    steps[2].style.gridColumn = '1'
                    steps[2].style.gridRow = '1 / 3'
                    steps[2].style.display = 'flex' // Show step-3
                    break
                case 2: // dot-3 active
                    steps[3].style.gridColumn = '1'
                    steps[3].style.gridRow = '1'
                    steps[3].style.display = 'flex' // Show step-4
                    steps[4].style.gridColumn = '1'
                    steps[4].style.gridRow = '2'
                    steps[4].style.display = 'flex' // Show step-5
                    break
                case 3: // dot-4 active
                    steps[5].style.gridColumn = '1'
                    steps[5].style.gridRow = '1 / 3'
                    steps[5].style.display = 'flex' // Show step-6
                    break
                case 4: // dot-5 active
                    steps[6].style.gridColumn = '1'
                    steps[6].style.gridRow = '1 / 3'
                    steps[6].style.display = 'flex' // Show step-7
                    break
            }
        }

        function updateUI() {
            // Update dots' colors
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentStep ? '#313131' : '' // Change color for active dot
            })

            // Update arrow colors based on the current step
            leftArrow.style.backgroundColor = currentStep === 0 ? '' : '#313131' // Default color if at the first step
            rightArrow.style.backgroundColor = currentStep === 4 ? '' : '#313131' // Default color if at the last step
        }

    } else if (window.matchMedia('(min-width: 860px)').matches) {
        // Код для выполнения при изменении размера окна больше или равно 860px
        resetSteps() // Сброс стилей для всех шагов

        function resetSteps() {
            steps.forEach(step => {
                step.style.display = 'flex'   // Показываем все шаги в flex режиме
                step.style.gridColumn = ''     // Сбрасываем grid-column, если необходимо 
                step.style.gridRow = ''        // Сбрасываем grid-row, если необходимо 
            })
        }
    }
})

// Инициализация при загрузке страницы
window.dispatchEvent(new Event('resize'))