const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  if (!name || !username || !password) {
    return res.render('register', { message: 'Please try again' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    username,
    password: passwordHash
  });

  await user.save();
  res.render('login'); 
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login', // กำหนด ถ้า login fail จะ redirect ไป /login
    successRedirect: '/' // ถ้า success จะไป /
  }),
  async (req, res) => {
    const { username, password } = req.body
    return res.redirect('/')
  }
);

module.exports = router;