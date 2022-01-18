const bcrypt = require('bcrypt')
const usersRoute = require('express').Router()
const User = require('../models/user')

usersRoute.post('/', async (request, response, next) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({
      "error": "password should have a length of at least 3 characters"
    })
  } else if (body.username.length < 3) {
    return response.status(400).json({
      "error": "username should have a length of at least 3 characters"
    }) 
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch(error) {
    next(error)
  }
})

usersRoute.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', ['url', 'title', 'author'])
    response.json(users)
  }
  catch(error) {
    next(error)
  }

})

module.exports = usersRoute