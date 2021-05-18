import React from 'react'
import {addNew} from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import {setNotification, deleteNotification} from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {




const addNewA = async (event) => {
      event.preventDefault()
      const content = event.target.input.value
      event.target.input.value = ''
      props.addNew(content)

    props.setNotification(`you added '${content}'`, 3)
      
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
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes : state.anecdotes,
    notification : state.notification
  }
}

const mapDispatchToProps = {
  addNew,setNotification
}

const ConnectedAnecdoteForm= connect(mapStateToProps,
  mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm 