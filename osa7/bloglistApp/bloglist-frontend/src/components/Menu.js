import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'


import { Link
} from 'react-router-dom'

const Menu = ({ handleLogOut }) => {
  const storeNotification = useSelector( state => state.notification)
  const user = useSelector(state => state.user)


  const padding = {
    paddingRight: 5
  }


  return (

    <div>
      {storeNotification !== '' && <Notification message = {storeNotification}/>}
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <p> {user.username} logged in <button onClick = {handleLogOut}> log out</button> </p>
    </div>

  )
}
export default Menu


// {storeNotification !== '' && <Notification message = {storeNotification}/>}
// <Router>
//   <Link to ='/blogs'> blogs </Link>
//   <Link to ='/users'> users </Link>
// </Router>
// <p> {user.username} logged in <button onClick = {handleLogOut}> log out</button> </p>