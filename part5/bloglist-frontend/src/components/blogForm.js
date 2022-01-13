import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleChange = (event) => {
    event.preventDefault()
    const target = event.target
    if (target.name === 'Title') {
      console.log(target.value)
      setTitle(target.value)
    } else if (target.name === 'Author') {
      console.log(target.value)
      setAuthor(target.value)
    } else if (target.name === 'Url') {
      console.log(target.value)
      setUrl(target.value)
    }
  }

  const addPost = (event) => {
    event.preventDefault()
    console.log(user)
    createBlog({
      'title': title,
      'author':author,
      'url': url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return(
    <div className='formDiv'>
      <form onSubmit={addPost}>
        Title
        <input type="text" name='Title' id="title" value={title}  onChange={handleChange}/><br/>
        Author
        <input type="text" name='Author' id="author" value={author}  onChange={handleChange} /><br/>
        Url
        <input type="url" name='Url' id="url" value={url}  onChange={handleChange} /><br/>
        <button type="submit">Create post</button>
      </form>
    </div>
  )}

export default BlogForm