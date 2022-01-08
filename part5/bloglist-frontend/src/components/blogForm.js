import React from 'react'

const BlogForm = (props) => (
  <div>
  <form onSubmit={props.onSubmit}>
    Title
    <input type="text" name='Title' id="title" value={props.title}  onChange={props.onChange}/><br/>
    Author
    <input type="text" name='Author' value={props.author}  onChange={props.onChange} /><br/>
    Url
    <input type="url" name='Url' value={props.url}  onChange={props.onChange} /><br/>
    <button type="submit">Create post</button>
  </form>
</div>
)

export default BlogForm