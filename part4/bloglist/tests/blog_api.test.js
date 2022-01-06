const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')
const helper = require('../utils/list_helper')
const bcrypt =require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const { response } = require('express')

let token
beforeEach(async () => {

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const response = await api
  .post('/api/login')
  .send({
    username: 'root',
    password: 'sekret'
  })

  token = response.body.token

})


test('blog app return correct amount of blogs', async () => {

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)

})

test('blog posts include id property', async () => {

   const response =  await api.get('/api/blogs')
   expect(response.body[0].id).toBeDefined()

})

test('blog post is succesfully created', async () => {

  await api
  .post('/api/blogs/')
  .set({ Authorization: `bearer ${token}` })
  .send({
      title: "Yes you could",
      author: "Robert Zananni",
      url: "http://blog.cleanballs.com/uncle-ball/2122/03/03/shinning-balls-with-ease.html",
    })
  .expect(200)
  .expect('Content-type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    "Yes you could"
  )

})

test('blog post fails with status code 401 if token not provided', async () => {

  await api
  .post('/api/blogs/')
/*   .set({ Authorization: `bearer ${token}` })
 */  
  .send({
      title: "Yes you could not",
      author: "Robert Zananni",
      url: "http://blog.cleanballs.com/uncle-ball/2122/03/03/shinning-balls-with-pain.html",
    })
  .expect(401)
  .expect('Content-type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  const titles = response.body.map(r => r.title)
  expect(titles).not.toContain(
    "Yes you could not"
  )

})


test('likes property default value 0 if missing', async () => {

    await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}` })
    .send(
      {
        title:"Like property is missing",
        author: "Tommy Nav O",
        url: "http://blog.tommy.org/like-tom.html"
      })
      

  const response =  await api.get('/api/blogs')
  expect(response.body[helper.initialBlogs.length]).toHaveProperty('likes', 0)

})

test('400 bad request if title or url is missing', async () => {

  await api
  .post('/api/blogs')
  .set({ Authorization: `bearer ${token}` })
  .send(
    {
      author: "Tommy Nav O" 
    })
  .expect(400)
})

test('post deleted succesfully', async () => {
  const blogtoAdd = await api
  .post('/api/blogs/')
  .set({ Authorization: `bearer ${token}` })
  .send({
      title: "Yes you could",
      author: "Robert Zananni",
      url: "http://blog.cleanballs.com/uncle-ball/2122/03/03/shinning-balls-with-ease.html",
    })

  const blogsAtStart = await helper.blogsInDb()
  blogsAtStart.concat(blogtoAdd)
  const blogToDelete = blogsAtStart[6]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: `bearer ${token}` })
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(n => n.title)

  expect(titles).not.toContain(blogToDelete.title)
  
}, 20000)

describe('invalid user are not created', () => {

  test('username should be at least three character length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser  = {
      "username": "ma",
      "name": "Manuel",
      "password": "3456634"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    
    expect(result.body.error).toContain('username should have a length of at least 3 characters')

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password should be at least 3 character length', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser  = {
      "username": "manu",
      "name": "Manuel",
      "password": "34"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)
    
    expect(result.body.error).toContain('password should have a length of at least 3 characters')
 
    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username should be unique', async () => {
    const newUser  = {
      "username": "root",
      "name": "Manuel",
      "password": "33444"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
  })
})

afterAll(() => {
  mongoose.connection.close()
})