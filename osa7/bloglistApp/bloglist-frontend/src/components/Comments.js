import React, { } from 'react'
import { useSelector } from 'react-redux'


const Comments = ({ id }) => {
  if (!id) {
    return null
  }
  console.log('id in', id)
  const comments = useSelector(state => state.comments)
  console.log('cimments', comments)
  const blogsComments = comments.filter(comment => comment.blog.id === id )

  return(
    <div>
      <h2> comments </h2>
      <ul>
        {blogsComments.map(comment => <li key = {comment.id}> {comment.comment} </li>)}
      </ul>

    </div>
  )
}


export default Comments
