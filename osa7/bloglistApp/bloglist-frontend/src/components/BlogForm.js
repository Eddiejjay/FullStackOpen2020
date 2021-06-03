
import React, { useState, useRef } from 'react'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addNewBlogStore } from '../reducers/blogReducer'
import styled from 'styled-components'

const StyledInput = styled.input `
margin : 5px;
background: rgb(255,0,0);
border: solid 5px;
`
const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

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

    // createBlog(newBlog) siirrä täääää Reduceriin
    dispatch(addNewBlogStore(newBlog, user, blogFormRef))
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
          <StyledInput
            id='title'
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({ target }) => setTitle(target.value)}
          />  </div>
        <div> author:
          <StyledInput
            id='author'
            type = "text"
            value = {author}
            name = "Author"
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div> url:
          <StyledInput
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





export default BlogForm