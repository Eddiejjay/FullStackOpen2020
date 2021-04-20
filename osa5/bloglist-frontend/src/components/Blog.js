import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({blog}) => {
const [blogState, setBlogState] = useState(false)

const handleShow = () => setBlogState(true)
const handleHide = () => setBlogState(false)


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
  {blog.likes} <button>like</button>
  <br></br> 
  {blog.user === null ?"":blog.user.name }
</div>  

)

  }}
export default Blog