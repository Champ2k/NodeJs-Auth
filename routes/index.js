var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login')
  }
  next()
}

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'Express' })
})

/* GET register page. */
router.get('/register', (req, res) => {
  res.render('register')
})

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router;