import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
const {E} = p.Ren.native()
import * as qoutes from './qoutes.js';
// import * as qoutes from './data/qoutes.js';
console.log(`The site was made by Severin B. https://sirseverin.ru/
༼ つ ◕_◕ ༽つ
`)

// Running Line
window.addEventListener('load', function() {
  const runningLine = document.querySelector('.running-line');
  const lineBlock = document.querySelector('.line-block');
  const containerWidth = runningLine.offsetWidth;
  let contentWidth = lineBlock.scrollWidth;

  // Пока ширина контента меньше ширины контейнера, клонируем содержимое
  while (contentWidth < containerWidth) {
    const clone = lineBlock.cloneNode(true);
    runningLine.appendChild(clone);
    contentWidth += clone.scrollWidth;
  }
});




// URL button copy
document.querySelectorAll('.copy-b').forEach(button => {
  button.addEventListener('click', () => {
    const parentDiv = button.closest('.quote') // Получаем родительский div
    const divId = parentDiv.id // Получаем ID родительского div
    const currentUrl = window.location.href // Получаем текущий URL
    const textToCopy = `${currentUrl}#${divId}` // Формируем текст для копирования

    // Используем Clipboard API для копирования текста
    navigator.clipboard.writeText(textToCopy)
      // .then(() => {
      //   console.log('Текущий адрес и ID скопированы в буфер обмена!')
      //   alert('Скопировано: ' + textToCopy) // Уведомление для пользователя
      // })
      // .catch(err => {
      //   console.error('Ошибка при копировании: ', err)
      // })
  })
})

// Random day-qoute
function getRandomEvent() {
  const randomIndex = Math.floor(Math.random() * qoutes.q.length)
  return qoutes.q[randomIndex]
}
function setEvent() {
  const lastEventDate = localStorage.getItem('lastEventDate')
  const today = new Date().toISOString().split('T')[0] // Получаем текущую дату в формате YYYY-MM-DD
  if (lastEventDate !== today) {
      // Если дата изменилась, устанавливаем новое событие
      const newEvent = getRandomEvent()
      document.querySelector('.today-quote').innerText = `— ` + newEvent // Выводим событие в div
      localStorage.setItem('lastEventDate', today) // Сохраняем текущую дату
      localStorage.setItem('currentEvent', newEvent) // Сохраняем текущее событие
  } else {
      // Если дата не изменилась, загружаем предыдущее событие
      const previousEvent = localStorage.getItem('currentEvent')
      document.querySelector('.today-quote').innerText = previousEvent // Выводим предыдущее событие
  }
}
// Обновляем событие при загрузке страницы
setEvent()


// Random button qoute
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * qoutes.q.length)
  return qoutes.q[randomIndex]
}
function updateQuote() {
  const newQuote = getRandomQuote()
  document.querySelector('.button-quote').innerText = `— ` + newQuote // Обновляем текст в div
}
// Обновляем цитату при загрузке страницы
updateQuote()
// Обновляем цитату по нажатию кнопки
document.querySelector('.quote-button').addEventListener('click', updateQuote)

let count = 0
document.querySelector(`.quote-button`).addEventListener(`click`, () => {
  count++
  document.querySelector('.click-count').innerText = count
})
