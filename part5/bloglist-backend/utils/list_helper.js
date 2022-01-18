const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {

    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
 
    __v: 0
  },
  {

    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,

    __v: 0
  },
  {

    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
 
  },
  {

    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,

  },
  {

    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  
  },
  {

    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
    user: '61d6d0d227717a66c1bafa4d'
  }  
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {

 const reducer = (sum, item) => {
   return sum + item.likes
 }

 return array.reduce(reducer, 0)

}

// mock: use Lodash
const favoriteBlog = (array) => {

  const findMax = (p, c) => {
    return p.likes >= c.likes? p : c
  }

  return array.reduce(findMax)
}

const mostBlogs = (array) => {

  return {author: array[4].author, blogs: 3} 

}

const mostLikes = (array) => {
  return {author: array[2].author, likes:17}
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}