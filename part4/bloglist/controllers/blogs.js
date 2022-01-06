const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await  Blog.find({}).populate('user', ['username', 'name', 'user'])
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if(blog) {
        response.json(blog)
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
  const body = request.body
  const user =  request.user
  if(!body.title) {
    response.status(400).json({
      error: 'title missing'
    })
  } else if (!body.url) {
    response.status(400).json({
      error: 'url missing'
    })
  }

  const blog = new Blog(
    {
      "user": user, // not user._id as user is the id
      "title": body.title,
      "author": body.author,
      "url": body.url,
      "likes": body.likes
    }
  )
    const savedBlog = await blog.save()
    const userBlog = await User.findById( request.user ) // getting user again ...? check middleware
    userBlog.blogs = userBlog.blogs.concat(savedBlog._id)

    await userBlog.save()
    response.json(savedBlog)
    
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  try {
    const blog = await Blog.findById(request.params.id)

    if(!blog.user) {
      return response.status(404).json({ error: 'user not found' })
    }
    if ( blog.user.toString() === request.user ) {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  } catch(error) {
      next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog ={
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id ,blog, {new: true})
    return response.json(updatedBlog)

  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter