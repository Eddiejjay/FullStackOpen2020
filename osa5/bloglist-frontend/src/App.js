import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
  console.log(user)
  setUsername('')
  setPassword('')
  }
  catch (exception) {
 console.log('errörii mnessafef',exception)
  }
}


  return (
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
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App