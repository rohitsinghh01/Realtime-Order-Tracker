const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
  const _getRedirectUrl = (req) => {
    return req.user.role === 'admin' ? '/admin/orders' : '/';
  };

  return {
    login(req, res) {
      res.render('auth/login');
    },
    async postLogin(req, res, next) {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/login');
      }
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          req.flash('error', info.message);
          return next(err);
        }
        if (!user) {
          req.flash('error', info.message);
          return res.redirect('/login');
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash('error', info.message);
            return next(err);
          }

          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render('auth/register');
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        req.flash('error', 'All fields are required');
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect('/register');
      }

      try {
        const userExists = await User.exists({ email: email });
        if (userExists) {
          req.flash('error', 'Email already taken');
          req.flash('name', name);
          req.flash('email', email);
          return res.redirect('/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        await user.save();
        return res.redirect('/login');
      } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('/register');
      }
    },
    logout(req, res) {
      req.logout((err) => {
        if (err) {
          console.error('Error logging out:', err);
        }
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
          }
          res.redirect('/login');
        });
      });
    },
  };
}

module.exports = authController;
