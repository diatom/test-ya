import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
const {E} = p.Ren.native()
console.log(`The site was made by Severin B. https://sirseverin.ru/
༼ つ ◕_◕ ༽つ
`)

// Running Line
// window.addEventListener('load', function() {
//   const runningLineT = document.getElementById('run-line-top')
//   const lineBlock = document.querySelector('.line-block')
//   let totalWidth = 0
//   const lineBlockWidth = lineBlock.offsetWidth
//   while (totalWidth < runningLineT.offsetWidth * 3) {
//       const clone = lineBlock.cloneNode(true)
//       runningLineT.appendChild(clone)
//       totalWidth += lineBlockWidth
//   }
// })
// window.addEventListener('load', function() {
//   const runningLineB = document.getElementById('run-line-bot')
//   const lineBlock = document.querySelector('.line-block')
//   let totalWidth = 0
//   const lineBlockWidth = lineBlock.offsetWidth
//   while (totalWidth < runningLineB.offsetWidth * 3) {
//       const clone = lineBlock.cloneNode(true)
//       runningLineB.appendChild(clone)
//       totalWidth += lineBlockWidth
//   }
// })

let currentSlide = 0; // Начинаем с первого слайда
const slides = document.querySelectorAll('.slide-players'); // Получаем все слайды
const arrowLeft = document.getElementById('arrow-left'); // Кнопка "влево"
const arrowRight = document.getElementById('arrow-right'); // Кнопка "вправо"
const sliderNum = document.querySelector('.slider-num'); // Элемент для отображения номера слайда

function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });
    sliderNum.textContent = `${slideIndex + 1} / ${slides.length}`; // Обновляем номер слайда
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Переход к следующему слайду
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Переход к предыдущему слайду
    showSlide(currentSlide);
}

// Обработчики событий для кнопок
arrowLeft.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Уменьшаем индекс текущего слайда
    showSlide(currentSlide);
    resetAutoSwitch(); // Сбрасываем таймер автопереключения
});

arrowRight.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length; // Увеличиваем индекс текущего слайда
    showSlide(currentSlide);
    resetAutoSwitch(); // Сбрасываем таймер автопереключения
});

// Автоматическое переключение слайдов
let autoSwitchInterval = setInterval(nextSlide, 4000); // Каждые 4 секунды

function resetAutoSwitch() {
    clearInterval(autoSwitchInterval); // Очищаем предыдущий таймер
    autoSwitchInterval = setInterval(nextSlide, 4000); // Запускаем новый таймер
}

// Инициализация первого слайда
showSlide(currentSlide);



// URL button copy
// document.querySelectorAll('.copy-b').forEach(button => {
//   button.addEventListener('click', () => {
//     const parentDiv = button.closest('.quote') // Получаем родительский div
//     const divId = parentDiv.id // Получаем ID родительского div
//     const currentUrl = window.location.href // Получаем текущий URL
//     const textToCopy = `${currentUrl}#${divId}` // Формируем текст для копирования

//     // Используем Clipboard API для копирования текста
//     navigator.clipboard.writeText(textToCopy)
//       // .then(() => {
//       //   console.log('Текущий адрес и ID скопированы в буфер обмена!')
//       //   alert('Скопировано: ' + textToCopy) // Уведомление для пользователя
//       // })
//       // .catch(err => {
//       //   console.error('Ошибка при копировании: ', err)
//       // })
//   })
// })

// // Random day-qoute
// function getRandomEvent() {
//   const randomIndex = Math.floor(Math.random() * qoutes.q.length)
//   return qoutes.q[randomIndex]
// }
// function setEvent() {
//   const lastEventDate = localStorage.getItem('lastEventDate')
//   const today = new Date().toISOString().split('T')[0] // Получаем текущую дату в формате YYYY-MM-DD
//   if (lastEventDate !== today) {
//       // Если дата изменилась, устанавливаем новое событие
//       const newEvent = getRandomEvent()
//       document.querySelector('.today-quote').innerText = `— ` + newEvent // Выводим событие в div
//       localStorage.setItem('lastEventDate', today) // Сохраняем текущую дату
//       localStorage.setItem('currentEvent', newEvent) // Сохраняем текущее событие
//   } else {
//       // Если дата не изменилась, загружаем предыдущее событие
//       const previousEvent = localStorage.getItem('currentEvent')
//       document.querySelector('.today-quote').innerText = previousEvent // Выводим предыдущее событие
//   }
// }
// // Обновляем событие при загрузке страницы
// setEvent()


// // Random button qoute
// function getRandomQuote() {
//   const randomIndex = Math.floor(Math.random() * qoutes.q.length)
//   return qoutes.q[randomIndex]
// }
// function updateQuote() {
//   const newQuote = getRandomQuote()
//   document.querySelector('.button-quote').innerText = `— ` + newQuote // Обновляем текст в div
// }
// // Обновляем цитату при загрузке страницы
// updateQuote()
// // Обновляем цитату по нажатию кнопки
// document.querySelector('.quote-button').addEventListener('click', updateQuote)

// let count = 0
// document.querySelector(`.quote-button`).addEventListener(`click`, () => {
//   count++
//   document.querySelector('.click-count').innerText = count
// })
