const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'UAH',
    style: 'currency',
  }).format(price)
}

const toDate = (date) => {
  date = Date.now()
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date))
}

//форматуємо ціну
document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent)
})

//те саме для дати
document.querySelectorAll('.date').forEach((node) => {
  node.textContent = toDate(node.textContent)
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

M.Tabs.init(document.querySelectorAll('.tabs'))
