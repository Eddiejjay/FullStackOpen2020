import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducers'
import thunk from 'redux-thunk'




const reducer = combineReducers({
  notification : notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users : allUsersReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))
store.subscribe(() => {
  const storeNow = store.getState()
  console.log('Store on nyt, tulostus index.js subscribe',storeNow)
})

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  , document.getElementById('root'))