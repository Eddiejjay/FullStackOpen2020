import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert('New book added!!')
      console.log(subscriptionData)
    }
  })

console.log('result ', result)
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  console.log('token appistä', token)
  return (

    
    <div>
      <div>
       <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button> 
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => logout()}>log out</button>} 
        {!token && <button onClick={() => setPage('login')}>login</button>} 
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.loading ? [] : result.data.allAuthors}
        token = {token}
      />

      <Books
        show={page === 'books'}
        books = {result2.loading ? [] :result2.data.allBooks}
      />

      <NewBook
        show={page === 'add' && token}
      />
      <Recommend show={page ==='recommend'}
       books = {result2.loading ? [] :result2.data.allBooks}/>

       {!token && <Login
        show={page === 'login'}
        setToken = {setToken}
        setError={notify}
      />
       }

    </div>
  )
}

export default App