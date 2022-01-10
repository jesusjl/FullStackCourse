import React from 'react'

const BlogForm = ({onSubmit, title, onChange, author, url}) => (
  <div>
  <form onSubmit={onSubmit}>
    Title
    <input type="text" name='Title' id="title" value={title}  onChange={onChange}/><br/>
    Author
    <input type="text" name='Author' value={author}  onChange={onChange} /><br/>
    Url
    <input type="url" name='Url' value={url}  onChange={onChange} /><br/>
    <button type="submit">Create post</button>
  </form>
</div>
)

export default BlogForm