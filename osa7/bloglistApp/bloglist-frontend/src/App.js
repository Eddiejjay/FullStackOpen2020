import React, { useEffect, useRef } from 'react'
import AllBlogs from './components/AllBlogs'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs,addLikeToStore, deleteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/allUsersReducers'
import { storeUser } from './reducers/userReducer'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import DetailsBlog from './components/DetailsBlog'
import { initializeComments } from './reducers/commentReducer'


const App = () => {
  const dispatch = useDispatch()
  const storeNotification = useSelector( state => state.notification)
  // const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs()),
    dispatch(initializeUsers())
    dispatch(initializeComments())

  }, [dispatch])

  useEffect(() => {
    const userFromStorage = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (userFromStorage)
      dispatch(storeUser(userFromStorage))
  }, [dispatch])




  const createBlog = async (blogObject) => {

    try {
      blogService.setToken(user.token)
      await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()

    }catch(error) {
      console.log('käm,mmmmi')
      console.log(error)

    }
  }

  const updateLike = async (blogObject, id) => {
    try {
      await blogService.addLike(blogObject,id)
      dispatch(addLikeToStore(id))

    }catch(error){
      console.log(error)
      console.log('että semmosta puttia')
    }

  }


  const removeBlog = async (id) => {
    try {
      console.log(user)
      blogService.setToken(user.token)
      await blogService.remove(id)
      dispatch(deleteBlog(id))

    } catch(error) {
      console.log(error)
      console.log('errrrööööör REMOVE')
    }
  }

  const handleLogOut = () => {
    dispatch(createNotification(`Bye Bye see you next time ${user.username}`))
    setTimeout(() => {
      dispatch(createNotification(''))
      dispatch(storeUser(null))
    }, 2000)
    window.localStorage.removeItem('loggedUser')



  }


  const blogForm = () =>
    (
      <Togglable buttonLabel = "create blog" ref = {blogFormRef}>
        <BlogForm createBlog = {createBlog}/>

      </Togglable>

    )


  const loggedInShow = () => (
    <div id = "loggedInDiv">



      <Router>
        <Menu handleLogOut ={ handleLogOut }></Menu>
        {blogForm()}
        <Switch>
          <Route path = "/users/:id" >
            <User/>
          </Route>
          <Route path = "/users">
            <Users/>
          </Route>
          <Route path = "/blogs/:id">

            <DetailsBlog removeBlog = {removeBlog} updateLike = {updateLike}></DetailsBlog>
          </Route>
          <Route path = "/blogs">

            <AllBlogs updateLike = {updateLike} removeBlog = {removeBlog} user = {user}></AllBlogs>
          </Route>
        </Switch>
      </Router>
    </div>

  )

  return (

    <div>
      {user === null && storeNotification !== '' && <Notification  message ={storeNotification}/>}
      {user=== null && <LoginForm ></LoginForm>}
      {/* {user !== null &&  <p> {user.name} logged in </p>} */}
      {user !== null && loggedInShow()}
    </div>
  )
}
export default App