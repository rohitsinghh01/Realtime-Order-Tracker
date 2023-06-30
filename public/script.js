// import axios from 'axios';
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
  axios.post('update-cart',pizza).then((res) => {
    console.log(res.data.totalQty);
    cartCounter.innerText=res.data.totalQty
     toastr.info('Item added to cart');
     toastr.options = {
       closeButton: false,
       debug: false,
       newestOnTop: false,
       progressBar: false,
       positionClass: 'toast-top-right',
       preventDuplicates: false,
       onclick: null,
       showDuration: '300',
       hideDuration: '1000',
       timeOut: '5000',
       extendedTimeOut: '1000',
       showEasing: 'swing',
       hideEasing: 'linear',
       showMethod: 'fadeIn',
       hideMethod: 'fadeOut',
     };
  });
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
