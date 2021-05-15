



// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     votes: 0
//   }
// }


export const addVote = (id) => {
  return {
    type:'VOTE',
    id:id

  }

}

export const addNew = (newAnecdote) => {

  return {type: 'NEW',
          data: {
          ...newAnecdote}
          }

}

export const setNotification = notification => {
  return (
    {type:'NOTIFICATION',
    message:notification}

  )
}
export const deleteNotification = () => {
  return (
    {type:'REMOVENOTIFICATION'
  })}

// const initialState = anecdotesAtStart.map(asObject)
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}




const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
    const id = action.id
    const voteToChange = state.find(a => a.id === id)
    const changedVote = {...voteToChange, votes: voteToChange.votes + 1}
    console.log(changedVote)
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
      return state.concat(action.message)
      case 'REMOVENOTIFICATION': 
        return state = notificationState
      default: return state
      

    }

  }

  export const filterChange = filterText => {
    console.log('filter text ' ,filterText)
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