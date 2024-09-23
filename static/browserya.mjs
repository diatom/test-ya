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
            visibleSlides = 3
        } else if (containerWidth >= 788) {
            visibleSlides = 2
        } else if (containerWidth >= 394) {
            visibleSlides = 1
        } else {
            visibleSlides = 1
        }
    }
    updateVisibleSlides()
     
    window.addEventListener('resize', updateVisibleSlides)
    let currentSlideGroup = 0
    function updateSliderNum() {
        sliderNum.textContent = (currentSlideGroup + 1) + ' / ' + Math.ceil(totalSlides / visibleSlides)
    }
    function goToSlide(groupIndex) {
        slidesWrap.style.transform = 'translateX(' + (-groupIndex * (100 / Math.ceil(totalSlides / visibleSlides))) + '%)'
        currentSlideGroup = groupIndex
        updateSliderNum()
    }
    function nextSlide() {
        const totalGroups = Math.ceil(totalSlides / visibleSlides)
        currentSlideGroup = (currentSlideGroup + 1) % totalGroups
        goToSlide(currentSlideGroup)
    }
    function prevSlide() {
        const totalGroups = Math.ceil(totalSlides / visibleSlides)
        currentSlideGroup = (currentSlideGroup - 1 + totalGroups) % totalGroups
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
    updateSliderNum()
})

window.addEventListener('resize', () => {
    const steps = document.querySelectorAll('.step')
    const dots = document.querySelectorAll('.step-dot')
    const leftArrow = document.getElementById('step-arrow-left')
    const rightArrow = document.getElementById('step-arrow-right')
    let currentStep = 0
    if (window.matchMedia('(max-width: 859px)').matches) {
        setStepStyles(currentStep)
        updateUI()

        rightArrow.addEventListener('click', function() {
            if (currentStep < 4) {
                currentStep++
                setStepStyles(currentStep)
                updateUI()
            }
        })
        leftArrow.addEventListener('click', function() {
            if (currentStep > 0) {
                currentStep--
                setStepStyles(currentStep)
                updateUI()
            }
        })
        function setStepStyles(index) {
            steps.forEach(step => {
                step.style.display = 'none'
            })
            switch (index) {
                case 0:
                    steps[0].style.gridColumn = '1'
                    steps[0].style.gridRow = '1'
                    steps[0].style.display = 'flex'
                    steps[1].style.gridColumn = '1'
                    steps[1].style.gridRow = '2'
                    steps[1].style.display = 'flex'
                    break
                case 1:
                    steps[2].style.gridColumn = '1'
                    steps[2].style.gridRow = '1 / 3'
                    steps[2].style.display = 'flex'
                    break
                case 2:
                    steps[3].style.gridColumn = '1'
                    steps[3].style.gridRow = '1'
                    steps[3].style.display = 'flex'
                    steps[4].style.gridColumn = '1'
                    steps[4].style.gridRow = '2'
                    steps[4].style.display = 'flex'
                    break
                case 3:
                    steps[5].style.gridColumn = '1'
                    steps[5].style.gridRow = '1 / 3'
                    steps[5].style.display = 'flex'
                    break
                case 4:
                    steps[6].style.gridColumn = '1'
                    steps[6].style.gridRow = '1 / 3'
                    steps[6].style.display = 'flex'
                    break
            }
        }
        function updateUI() {
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentStep ? '#313131' : ''
            })
            leftArrow.style.backgroundColor = currentStep === 0 ? '' : '#313131'
            rightArrow.style.backgroundColor = currentStep === 4 ? '' : '#313131'
        }
    } else if (window.matchMedia('(min-width: 860px)').matches) {
        resetSteps()
        function resetSteps() {
            steps.forEach(step => {
                step.style.display = 'flex'
                step.style.gridColumn = ''
                step.style.gridRow = ''
            })
        }
    }
})
window.dispatchEvent(new Event('resize'))
console.log(`O̲ppa̲ (っ-̶●̃益●̶̃)っ ,︵‿ S̲t̲yl̲e̲`)
