import React from 'react'
import {addNew} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {setNotification, deleteNotification} from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()



const addNewA = async (event) => {
      event.preventDefault()
      const content = event.target.input.value
      event.target.input.value = ''
      dispatch(addNew(content))

    dispatch(setNotification(`you added '${content}'`, 3))
      
  }


  return (
    <div>
    <h2>create new</h2>
    <form onSubmit = {addNewA}>
    <div><input name='input'/></div>
    <button>create</button>
  </form>
</div>
  )
}
  export default AnecdoteForm