import React from 'react'
import {addNew} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {setNotification, deleteNotification} from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()



const addNewA =(event) => {

    event.preventDefault()

    console.log('event.targer.valueeee on', event.target.input.value)
    dispatch(addNew(event.target.input.value))
    dispatch(setNotification(`you added  ${event.target.input.value}`))


    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
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