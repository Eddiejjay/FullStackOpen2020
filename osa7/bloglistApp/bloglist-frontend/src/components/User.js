import React from 'react'
import { useSelector } from 'react-redux'
import {
  useParams

} from 'react-router-dom'


const User = () => {
  const users =  useSelector(state => state.users)
  const id = useParams().id
  const clickedUser = users.find(user => user.id === id)

  const blogs =  useSelector(state => state.blogs)
  if (!clickedUser) {
    return null
  }

  // const usersBlogs = useSelector(state => state.user.blogs)
  const usersBlogs = blogs.filter(blog => blog.user.id === id)
  console.log(id)
  console.log(usersBlogs)
  console.log('PRese')




  return (
    <div>
      <h1>{clickedUser.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {usersBlogs.map(element => <li key = {element.id}> {element.title}</li>)}

      </ul>

    </div>
  )



}


export default User