import React from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog2 = ({blog ,handleHide}) => (
  <div style = {blogStyle}>
  {blog.title} {blog.author} 
  <button onClick ={handleHide}>hide</button>
  <br></br>
  {blog.url}
  <br></br>
  {blog.likes}
  <br></br> 
  tähän pitäs saada vielä username 
</div>  


)

export default Blog2