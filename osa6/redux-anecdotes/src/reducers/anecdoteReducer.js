

import anecdoteService from '../services/anecdotes'

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     votes: 0
//   }
// }


// export const voteAnecdote = (votedAnecdote) => {
//   return async (dispatch) => {
//     const anecdote = {
//       ...votedAnecdote,
//       votes: votedAnecdote.votes + 1,
//     };

//     const updatedAnecdote = await anecdoteService.update(anecdote);
//     const { id } = updatedAnecdote;
//     dispatch({
//       type: "VOTE",
//       data: { id },
//     });
//   };
// };


export const addVote = votedAnecdote => {
  return async dispatch => {
    const anecdote = {
    ...votedAnecdote,
    votes : votedAnecdote.votes +1
  
  }


  const updatedAnecdote = await anecdoteService.updateLike(anecdote)
    dispatch({
      type: "VOTE",
      id: updatedAnecdote.id ,
}
    )}}



export const addNew = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW',
      data: {...newAnecdote},
    })
  }
}

  let timeout

export const setNotification = (notification, time) => {
  return async dispatch => {
  
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    dispatch(
    {type:'NOTIFICATION',
    message:notification})
  
    timeout = setTimeout(() => {
      dispatch(deleteNotification())
    }, time*1000)
    
  }
}
export const deleteNotification = () => {
  return (
    {type:'REMOVENOTIFICATION'
  })}



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
    const id = action.id
    const voteToChange = state.find(a => a.id === id)
    const changedVote = {...voteToChange, votes: voteToChange.votes + 1}
    return state.map ( vote => vote.id !== id? vote: changedVote)
    case 'NEW': 
    const anecdoteToAdd = action.data
    return state.concat(anecdoteToAdd)
    case 'INIT_ANECDOTES':
      return action.data
  default: return state
  }}

const  notificationState = []

export const notificationReducer = (state = notificationState, action) => {
    switch (action.type) {
      case 'NOTIFICATION' :
      return state = notificationState, state.concat(action.message)
      case 'REMOVENOTIFICATION': 
        return state = notificationState
      default: return state
      

    }

  }

  export const filterChange = filterText => {
    return (
      {
        type:'BYINPUTFIELD',
        filterText:filterText
      }
      
    )
  }


  export const filterReducer =(state='', action)=>{
    switch (action.type){
      case'BYINPUTFIELD':
      return action.filterText
      default : return state
    }


  }


  

export default anecdoteReducer