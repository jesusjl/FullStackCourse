import React, {useState} from 'react'

const Blog = ({blog, updateBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisibility] = useState(false)
  const [label, setLabel] = useState('view')
  const hideWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisibility(!visible)
    setLabel(visible ? 'view' : 'hide')
  }

  const addLike = (event) => {
    event.preventDefault()
    updateBlog({...blog, "likes": blog.likes + 1 }, blog.id)
    
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={hideWhenVisible}>
        <div> {blog.url}  </div>
        <div>  likes {blog.likes} <button onClick={addLike}>like</button></div>
        <div>  {blog.author}  </div>
      </div>
    </div>
  )
}

export default Blog