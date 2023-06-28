const router = require('express').Router();
const { home } = require('../controller/homeController');
const {login}=require('../controller/loginController')
const {register}=require('../controller/registerController')
const {cart,updateCart}=require('../controller/cartController')

router.route('/').get(home);
router.route('/login').post(login).get(login);
router.route('/register').post(register).get(register);
router.route('/cart').get(cart);
router.route('update-cart').post(updateCart)

module.exports = router;
