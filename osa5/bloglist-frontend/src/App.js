import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogState, setBlogState] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
  const userFromStorage = JSON.parse(window.localStorage.getItem('loggedUser'))

  if (userFromStorage) 
    setUser(userFromStorage)
  }, [])


  const createBlog= async (blogObject) => {
  
    try {
      blogService.setToken(user.token)
      await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
    
    }catch {
      console.log('käm,mmmmi')
  
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
  setNotificationMessage(`Hello ${user.username} have a nice day!`)
  setTimeout(() => {
    setNotificationMessage(null)
  }, 2000)

  setUsername('')
  setPassword('')
  }
  catch (exception) {
    
  setNotificationMessage('wrong username or password')
  setTimeout(() => {
  setNotificationMessage(null)
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
    <input type= "text"
    value = {username}
    name = "Username"
    onChange = {(event) => setUsername(event.target.value)}
    />
    </div>
    <div>
    password
    <input type= "text"
    value = {password}
    name = "Password"
    onChange = {({target}) => setPassword(target.value)}

    />
    </div>

    <button type = "submit" >login</button>

    </form>
    </div>
)
const handleLogOut = () => {
  setNotificationMessage(`Bye Bye see you next time ${user.username}`)
  setTimeout(() => {
    setNotificationMessage(null)
  }, 2000)
  window.localStorage.removeItem('loggedUser')
  


}


const blogForm = () => 
 (
<Togglable buttonLabel = "create blog" ref = {blogFormRef}>
   <BlogForm createBlog = {createBlog}
   setNotificationMessage = {setNotificationMessage}/>
  
</Togglable>

  )


const loggedInShow = () => (
<div>
  <h2>blogs</h2>

  {notificationMessage !== null && <Notification  message={notificationMessage}/>}

  <p> {user.name} logged in <button onClick = {handleLogOut}> log out</button> </p>


{blogForm()}
  

  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog}/>
     
  )}
</div>

)

  return (

    <div>
      {user === null && notificationMessage !== null && <Notification  message={notificationMessage}/>}
      {user===null && loginForm()}
      {/* {user !== null &&  <p> {user.name} logged in </p>} */}
      {user !== null && loggedInShow()}
    </div>
  )
}
export default App