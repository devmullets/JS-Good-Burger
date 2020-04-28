const newHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
const burgersUrl = 'http://localhost:3000/burgers'
const burgerMenu = document.querySelector('#burger-menu')
const currentOrder = document.querySelector('#order-list')
const burgerForm = document.querySelector('#custom-burger')

document.addEventListener("DOMContentLoaded", () => {
  getBurgers()

  burgerMenu.addEventListener('click', function(event){
    if (event.target.className === 'button') {
      addToOrder(event.target.parentElement.querySelector('.burger_title').innerText)
    }
  })

  burgerForm.addEventListener('submit', function(event) {
    event.preventDefault()

    let newBurger = {
      name: burgerForm.name.value,
      description: burgerForm.description.value,
      image: burgerForm.url.value
    }

    createBurger(newBurger)
  })

})

function getBurgers() {

  fetch(burgersUrl)
    .then(response => response.json())
    .then(burgers => {burgers.forEach(burger => newBurger(burger))})
}

function newBurger(newBurger) {
  let burger = document.createElement('div')
  burger.className = "burger"
  burger.innerHTML = `
    <h3 class="burger_title">${newBurger.name}</h3>
    <img src="${newBurger.image}">
    <p class="burger_description">
      ${newBurger.description}
    </p>
    <button class="button">Add to Order</button>
  `
  burgerMenu.appendChild(burger)
}

function addToOrder(burger) {

  let newOrderItem = document.createElement('li')
  newOrderItem.innerText = burger
  currentOrder.appendChild(newOrderItem)

}

function createBurger(burger) {
  fetch(burgersUrl, {
    method: 'POST',
    headers: newHeaders,
    body: JSON.stringify(burger)
  })
    .then(response => response.json())
    .then(singleBurger => newBurger(singleBurger))

}



