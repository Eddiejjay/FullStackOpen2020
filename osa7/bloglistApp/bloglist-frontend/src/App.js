import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs,addLikeToStore, deleteBlog } from './reducers/blogReducer'





const App = () => {
  const dispatch = useDispatch()
  const storeNotification = useSelector( state => state.notification)
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  console.log(storeNotification)



  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (userFromStorage)
      setUser(userFromStorage)
  }, [])


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



  const loginHandler = async (event) => {
    event.preventDefault()

    const credentials = {
      username : username,
      password : password
    }

    try {


      const user = await loginService.login(credentials)
      setUser(user)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      dispatch(createNotification(`Hello ${user.username} have a nice day!`))

      setTimeout(() => {
        dispatch(createNotification(''))
      }, 2000)

      setUsername('')
      setPassword('')
    }
    catch (exception) {

      dispatch(createNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(createNotification(''))
      }, 2000)


      console.log('errörii mnessafef',exception)
    }
  }
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      <form onSubmit = {loginHandler}>
        <div>
    username
          <input
            id = 'username'
            type= "text"
            valupdateue = {username}
            name = "Username"
            onChange = {(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
    password
          <input
            id = 'password'
            type= "text"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}

          />
        </div>

        <button id = "login-button" type = "submit" >login</button>

      </form>
    </div>
  )
  const handleLogOut = () => {
    dispatch(createNotification(`Bye Bye see you next time ${user.username}`))
    setTimeout(() => {
      dispatch(createNotification(''))
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
      <h2>blogs</h2>

      {storeNotification !== '' && <Notification message = {storeNotification}/>}

      <p> {user.name} logged in <button onClick = {handleLogOut}> log out</button> </p>


      {blogForm()}


      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateLike = {updateLike} removeBlog = {removeBlog} user={user}/>

      )}
    </div>

  )

  return (

    <div>
      {user === null && storeNotification !== '' && <Notification  message ={storeNotification}/>}
      {user===null && loginForm()}
      {/* {user !== null &&  <p> {user.name} logged in </p>} */}
      {user !== null && loggedInShow()}
    </div>
  )
}
export default App