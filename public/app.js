//форматуємо ціну
document.querySelectorAll('.price').forEach((node) => {
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'UAH',
    style: 'currency',
  }).format(node.textContent)
})

const card = document.querySelector('#card')
if (card) {
  card.addEventListener('click', (event) => {
    //перевіряє чи є такий клас
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id

      fetch('/card/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((card) => {
          console.log(card)
        })
    }
  })
}
