// const cart = (req, res) => {
//   res.render('customer/cart');
// };

// const updateCart = (req, res) => {

//     if (!req.session) {
//       req.session = {};
//     }

//   if (!req.session.cart) {
//     req.session.cart = {
//       items: {},
//       totalQty: 0,
//       totalPrice: 0,
//     };
//   }
//   let cart = req.session.cart;
//   if (!cart.items[req.body._id]) {
//     cart.items[req.body._id] = {
//       item: req.body,
//       qty: 1,
//     };
//     cart.totalQty = cart.totalQty + 1;
//     cart.totalPrice = cart.totalPrice + req.body.price;
//   } else {
//     cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
//     cart.totalQty = cart.totalQty + 1;
//     cart.totalPrice = cart.totalPrice + req.body.price;
//   }
//   res.json({ totalQty: req.session.cart.totalQty });
// };

// module.exports = { cart, updateCart };
