// import axios from 'axios';
let addToCart = document.querySelectorAll('.add-to-cart');

function updateCart(pizza) {
  axios.post('update-cart').then((res) => {
    console.log(res);
  });
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
