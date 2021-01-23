import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVotes = (props) => {

  let anecdoteIndex = props.votes.indexOf(Math.max(...props.votes));
  let anecdote = props.anecdotes[anecdoteIndex]
  console.log(anecdoteIndex, 'and', anecdote)

  return(
    <p> eniten ääniä  sai {anecdote} </p>
  )


}

const Button = (props) => {

  return (
    <button onClick = {props.handleClick}>
      {props.text}
      </button>
  )
  }



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  let random =  0

  
  const handleNextClick =()=> {
    console.log(random)
    random = Math.floor(Math.random() * 6)
    setSelected(random)
  
  }

  const handleVoteClick =()=> {
  const votesCopy = [...votes]
  votesCopy[selected] += 1
  setVotes(votesCopy)
  console.log('votescopy', votesCopy)
   
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <Button handleClick = {handleNextClick} text ='next anecdote'/> 
      <Button handleClick = {handleVoteClick} text ='vote'/> 
      <h1>Anecdote with most votes</h1>
      <p> {props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes </p>
     </div>
  )
}





const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
