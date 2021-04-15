import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('jeejee')
  


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

  setUsername('')
  setPassword('')
  }
  catch (exception) {
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
  window.localStorage.removeItem('loggedUser')


}


const handleCreateNewBlog = async (event) => {
  event.preventDefault()

  try {
    blogService.setToken(user.token)
    await blogService.create({title,author,url})
    setTitle('')
    setUrl('')
    setAuthor('')
  }catch {
    console.log('käm,mmmmi')

  }
  }



const createNewBlogForm = () => (

<form onSubmit = {handleCreateNewBlog}>
<div> title:
<input
type = "text"
value = {title}
name = "Title"
onChange = {({target}) => setTitle(target.value)}
/> </div>
<div> author:
<input
type = "text"
value = {author}
name = "Author"
onChange = {({target}) => setAuthor(target.value)}
/>
</div> 
<div> url:
<input
type = "text"
value = {url}
name = "Url"
onChange = {({target}) => setUrl(target.value)}
/>
</div> 
<button type="submit">create</button>
</form>

)






const loggedInShow = () => (
<div>
  <h2>blogs</h2>

  <Notification message={message}/>

  <p> {user.name} logged in <button onClick = {handleLogOut}> log out</button> </p>

  {createNewBlogForm()}
 
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
</div>

)



  return (

    <div>
      
      {user===null && loginForm()}
      {/* {user !== null &&  <p> {user.name} logged in </p>} */}
      {user !== null && loggedInShow()}
      

      
    </div>
  )
}
export default App