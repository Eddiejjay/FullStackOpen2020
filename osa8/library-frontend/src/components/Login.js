import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'



const Login = ( {show, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      console.log('token useEffectistä ', localStorage.getItem('user-token'))
    }
  }, [result.data]) // eslint-disable-line
  


  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('Submit login',username, password)
    const result = await login({  variables: {username ,password} })
    const token = result.data.login.value
    setToken(token)
    setUsername('')
    setPassword('')
  console.log('Submit login',username, password)
  }




  return (
    <div>
      <form onSubmit={submit}>
        <div>
        username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
    
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
