const homeController = require('../controller/homeController');
const authController = require('../controller/authContoller');
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

function initRoutes(app) {
  app.get('/', homeController().index);
  app.get('/login', guest, authController().login);
  app.post('/login', authController().postLogin);
  app.get('/register', guest, authController().register);
  app.post('/register', authController().postRegister);
  app.post('/logout', authController().logout);
}

module.exports = initRoutes;
