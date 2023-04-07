const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const {SALT_ROUND } = require('../utils/config')

usersRouter.get('/:id', async (request, response) => {
  const userId = request.params.id
  User.find({ _id: userId }).then(users => {
    response.json(users[0])
  })
})
usersRouter.get('/getID/:userName', async (request, response) => {
  const userName = request.params.userName
  User.find({ name: userName }).then(users => {
    response.json(users[0])
  })
})
usersRouter.post('/', async (request, response) => {
  const { email, name, password } = request.body
  console.log(request.body)
  const findUser = await User.find({ email: email })
  if (findUser.length > 0) {
    return response.status(403).json({
      error: 'email already exists'
    })
  }
  const SALT_ROUND = 10
  const passwordHash = await bcrypt.hash(password, SALT_ROUND)

  const user = new User({
    email,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


module.exports = usersRouter