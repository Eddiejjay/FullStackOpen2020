import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer, { filterReducer } from './reducers/anecdoteReducer'
import {notificationReducer} from './reducers/anecdoteReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter : filterReducer
  })

  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
 

    export default store

    
   