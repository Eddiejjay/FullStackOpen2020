import React, { useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentReducer'


const Comments = ({ id }) => {
  if (!id) {
    return null
  }
  const [commentToAdd, setCommentToAdd] = useState('')
  console.log('id in', id)
  const comments = useSelector(state => state.comments)
  console.log('cimments', comments)
  const blogsComments = comments.filter(comment => comment.blog.id === id )
  const dispatch = useDispatch()

  const addNewComment = (event) => {
    event.preventDefault()
    const comment = {
      comment: commentToAdd
    }
    dispatch(addComment(comment, id))
    setCommentToAdd('')

  }

  return(
    <div>
      <form onSubmit = {addNewComment}>
        <div>
          <input
            id='comment'
            type = "text"
            value = {commentToAdd}
            name = "comment"
            onChange = {({ target }) => setCommentToAdd(target.value)}
          />
          <button id = "add-comment" type="submit" >add comment</button>
        </div>


      </form>
      <h2> comments </h2>
      <ul>
        {blogsComments.map(comment => <li key = {comment.id}> {comment.comment} </li>)}
      </ul>

    </div>
  )
}


export default Comments
