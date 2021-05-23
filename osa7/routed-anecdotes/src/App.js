
import { Table } from 'react-bootstrap'
import {useField} from './hooks'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"
import React, { useState } from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    
    <div>
      <Link style={padding} to="/" >anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  
  )
}

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  console.log(id)
  const anecdote = anecdotes.find(a => a.id ===id)
  console.log(anecdote)
  return (
    <div>
      <h2>{`${anecdote.content} by ${anecdote.author}`} </h2>
    </div>
  )

}




const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody> 
      {anecdotes.map(anecdote => 
      <tr key={anecdote.id} > 
         <td> 
            <Link to={`/anecdotes/${anecdote.id}`}> 
             {anecdote.content}
            </Link>
         </td>
      </tr> )}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')




  
  const history = useHistory()
  const handleSubmit = (e) => {
  
    e.preventDefault()
    props.addNew({
      content:content.value,
      author:author.value,
      info : info.value,
      votes: 0
    })

    props.setNotification(`a new anecdote ${content.value} created!`)
    history.push("/")
 

  }
  const reset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type = 'reset' onClick={reset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  console.log(anecdotes)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  const timeout = (sec) => {
    setTimeout(() => {
      setNotification(null)
    }, sec*1000)
  }

  return (
    <div className = "container">
      <h1>Software anecdotes</h1>

      <Router>

      <Menu />
      
      <Switch> 
      <Route path="/anecdotes/:id">
        <Anecdote anecdotes={anecdotes} />
      </Route>
      <Route path="/about">
         <About />
        </Route>
      <Route path="/create">
         <CreateNew addNew={addNew} setNotification ={setNotification} />
         </Route>
        <Route path = "/">
          {notification ? <strong>{notification}</strong> : null} 
          {timeout(10)}
          
         <AnecdoteList anecdotes={anecdotes} />

        </Route>
      </Switch>


      </Router>
    
      <Footer />
    
    </div>
  )
}

export default App;