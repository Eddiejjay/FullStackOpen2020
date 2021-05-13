

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


export const addVote = (id) => {
  return {
    type:'VOTE',
    id:id

  }

}

export const addNew = (newAnecdote) => {
 const object =  asObject(newAnecdote)
 console.log(' object on ' ,object)
  return {type: 'NEW',
          data: {
          ...object}
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

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
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