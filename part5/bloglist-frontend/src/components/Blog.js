import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisibility] = useState(false)
  const [label, setLabel] = useState('view')

  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visible)
    setLabel(visible ? 'view' : 'hide')
  }

  const addLike = (event) => {
    event.preventDefault()
    updateBlog({ ...blog, 'likes': blog.likes + 1 }, blog.id)
  }

  const removePost = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <div className='title'>{blog.title} <button className='' onClick={toggleVisibility}>{label}</button></div>
        <div className='author'>  {blog.author}  </div>
      </div>
      <div className='togglableContent' style={hideWhenVisible}>
        <div className='url'> {blog.url}  </div>
        <div className='likes'>  likes {blog.likes} <button id='likeButton' onClick={addLike}>like</button></div>
        { Object.prototype.hasOwnProperty.call(blog,'user') && blog.user !== null ? (blog.user.username === user.username ?  <div> <button id='removeButton' onClick={removePost}>remove</button></div>: 'fae'):''}
      </div>
    </div>
  )
}

export default Blog