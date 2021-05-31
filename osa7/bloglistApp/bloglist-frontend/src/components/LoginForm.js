
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { InitializeUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

const LoginForm = () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async (event) => {
    event.preventDefault()

    const credentials = {
      username : username,
      password : password
    }

    try {

      const jee = dispatch(InitializeUser(credentials))
      console.log('jee jeee on', jee)
      dispatch(createNotification(`Hello ${username} have a nice day!`),console.log('opersee'))
      console.log('perseee')




      // store.dispatch(
      //   makeASandwichWithSecretSauce('My wife')
      // ).then(() => {
      //   console.log('Done!');
      // });



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

  return (
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
            onChange = {
              ({ target }) => setPassword(target.value)}

          />
        </div>

        <button id = "login-button" type = "submit" >login</button>

      </form>
    </div>
  )
}

export default LoginForm