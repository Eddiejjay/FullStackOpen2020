import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addVote, deleteNotification} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/anecdoteReducer'
import Notification from './Notification'

const AnecdoteList = () => {
  const filter = useSelector (state => state.filter)

  const anecdotes =  useSelector(state => state.anecdotes).filter(a =>  a.content.includes(filter))

  const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
         console.log('vote', id)
        dispatch( setNotification())
        const anecdote = anecdotes.find(a=> a.id === id).content
        dispatch(setNotification(`you voted ${anecdote}`))

        setTimeout(() => {
          dispatch(deleteNotification())
        }, 5000)
    
      
     
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
          
            </div>
            
          )}
          
</div>
    )
}

export default AnecdoteList