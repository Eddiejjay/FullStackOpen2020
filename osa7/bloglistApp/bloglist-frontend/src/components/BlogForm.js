
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addNewBlogStore } from '../reducers/blogReducer'


const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes :''

    }

    createBlog(newBlog)
    dispatch(addNewBlogStore(newBlog))
    dispatch(createNotification(`a new blog ${title} by ${author}`))
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 2000)
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addBlog}>
        <div> title:
          <input
            id='title'
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({ target }) => setTitle(target.value)}
          /> </div>
        <div> author:
          <input
            id='author'
            type = "text"
            value = {author}
            name = "Author"
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div> url:
          <input
            id='url'
            type = "text"
            value = {url}
            name = "Url"
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button id = "create-blog" type="submit" >create</button>
      </form>
    </div>
  )


}

BlogForm.propTypes = {

  createBlog:PropTypes.func.isRequired,
}


export default BlogForm