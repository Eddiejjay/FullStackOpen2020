
import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'


const Users = () => {

  const allUSers2 = useSelector(state => state.users)

  console.log('allusers2', allUSers2)



  return (
    <div>
      <h2> Users  </h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>blogs created</th>
          </tr>
          {allUSers2.map(user => <tr key = {user.id}>
            <th>
              <Link to = {`/users/${user.id}` }> {user.username} </Link></th>
            <th></th>
            <th> {user.blogs.length}</th>
          </tr>)}
        </tbody>
      </table>

    </div>
  )
}

export default Users
