
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, updateLike, removeBlog, user }) => {
  const [blogState, setBlogState] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleShow = () => setBlogState(true)
  const handleHide = () => setBlogState(false)

  const handleRemove = () => {
    if (window.confirm('Remove blog ', blog.title, blog.author))
      removeBlog(blog.id)


  }

  const handleLike = () => {
    setLikes(likes +1)

    const blogObject = {
      user: blog.user.id,
      likes: likes ,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLike(blogObject, blog.id)



  }

  if (blogState === false) {
    return (

      <div style = {blogStyle}>
        {blog.title} {blog.author}
        <button onClick = {handleShow}>view</button>
      </div>
    ) }
  else {
    return(
      <div style = {blogStyle}>
        {blog.title} {blog.author}
        <button onClick ={handleHide}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        {blog.likes} <button onClick = {handleLike}>like</button>
        <br></br>
        {blog.user === null ?'':blog.user.name }
        <br></br>

        {user.username === blog.user.username? <button onClick = {handleRemove}>remove</button>:''}
      </div>

    )

  }}


Blog.propTypes = {

  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired

}
export default Blog