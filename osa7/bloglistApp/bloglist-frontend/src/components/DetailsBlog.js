



import React, { } from 'react'
import { useSelector } from 'react-redux'
import {
  useParams

} from 'react-router-dom'

const DetailsBlog = ({ updateLike, removeBlog }) => {
  const id = useParams().id
  const blogs =  useSelector(state => state.blogs)
  const clickedBlog = blogs.find(blog => blog.id === id)
  const loggedInUser = useSelector(state => state.user.username)


  if (!clickedBlog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5 }


  const handleRemove = () => {
    if (window.confirm('Remove blog ', clickedBlog.title, clickedBlog.author))
      removeBlog(id)


  }


  const handleLike = () => {

    const blogObject = {
      user: clickedBlog.user.id,
      likes: clickedBlog.likes +1 ,
      author: clickedBlog.author,
      title: clickedBlog.title,
      url: clickedBlog.url
    }
    updateLike(blogObject, clickedBlog.id)


  }


  return (
    <div style = {blogStyle}>

      <h1>{clickedBlog.title} {clickedBlog.author}</h1>
      <br></br>
      <a href= {`${clickedBlog.url}`}>{clickedBlog.url} </a>
      <br></br>
      {clickedBlog.likes} <button id = "like" onClick = {handleLike}>like</button>
      <br></br>
      {clickedBlog.user === null ?'':<p>added by {clickedBlog.user.username }</p>}
      <br></br>
      {loggedInUser=== clickedBlog.user.username && <button id = "button-remove" onClick = {handleRemove}>remove</button>}
    </div>

  )

}


export default DetailsBlog