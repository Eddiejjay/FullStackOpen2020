


import Comments from './Comments'
import React, { } from 'react'
import { useSelector } from 'react-redux'
import {
  useParams

} from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button `
color rgb(88,23,255);
font-size : 44px;
border-radius: 50%;
border: 4px dotted black;


`
const Styled = styled.div`
font-family: cursive;
background: orange;
padding: 23px
border-style: dotted;
borderWidth: 1;
margin: 5px;
`

const H1 = styled.h1 `
color:green;
paddingLeft: 2;
border: 'solid';
`

const Details = styled.div `
color:green;
background :white;
border-style: groove;
border-width:10px;
`

const DetailsBlog = ({ updateLike, removeBlog }) => {
  const id = useParams().id
  const blogs =  useSelector(state => state.blogs)
  const clickedBlog = blogs.find(blog => blog.id === id)
  const loggedInUser = useSelector(state => state.user.username)


  if (!clickedBlog) {
    return null
  }

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5 }


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
    <Styled>
      <div>

        <H1>{clickedBlog.title} {clickedBlog.author}</H1>
        <br></br>
        <Details>
          <a href= {`${clickedBlog.url}`}>{clickedBlog.url} </a>

          <br></br>
          {clickedBlog.likes} <button id = "like" onClick = {handleLike}>like</button>
          <br></br>

          {clickedBlog.user === null ?'':<p>added by {clickedBlog.user.username }</p>}
          <br></br>
        </Details>

        {loggedInUser=== clickedBlog.user.username && <Button id = "button-remove" onClick = {handleRemove}>remove</Button>}

        <Comments id = {clickedBlog.id}></Comments>
      </div>
    </Styled>

  )

}


export default DetailsBlog