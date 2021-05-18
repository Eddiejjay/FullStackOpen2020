import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addVote, deleteNotification} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/anecdoteReducer'
import Notification from './Notification'

const AnecdoteList = () => {
  const filter = useSelector (state => state.filter)

  const anecdotes =  useSelector(state => state.anecdotes).filter(a =>  a.content.includes(filter))

  const dispatch = useDispatch()

    const vote = (anec) => {
       dispatch(addVote(anec))
     

        dispatch(setNotification(`you voted '${anec.content}'`, 5))
      
     
       }
       

    return (
   <div> 
      <Notification/>
     {anecdotes.sort((a,b)=> b.votes-a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
          
            </div>
            
          )}
          
</div>
    )
}

export default AnecdoteList