const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/User')

router.post('/register', (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.render('index', { user })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({
    username,
    password
  })
  if (user) {
    return res.render('index', { user })
  } else {
    return res.render('login', { message: 'Email or Password incorrect' })
  }
})

module.exports = router