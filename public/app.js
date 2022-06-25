const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'UAH',
    style: 'currency',
  }).format(price)
}

//форматуємо ціну
document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent)
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
          //якщо в нас видалилися усі товари з корзини-обробляємо
          if (card.courses.length) {
            const html = card.courses
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class='btn btn-small js-remove' data-id='${c.id}'>Видалити</button>
                </td>
              </tr>
              `
              })
              .join('')
            card.querySelector('tbody').innerHTML = html
            card.querySelector('.price').textContent = toCurrency(card.price) //перерах ціну
          } else {
            card.innerHTML = '<p>Кошик пустий</p>'
          }
        })
    }
  })
}
