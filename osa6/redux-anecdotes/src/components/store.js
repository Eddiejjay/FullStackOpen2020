
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { filterReducer } from '../reducers/anecdoteReducer'
import {notificationReducer} from '../reducers/anecdoteReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter : filterReducer
  })

const store = createStore(reducer,
  composeWithDevTools()
    )
 

    export default store

   