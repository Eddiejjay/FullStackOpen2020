import React, { useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentReducer'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
const Layout = styled.section`
background: blue;

`


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
    <Layout>
      <form onSubmit = {addNewComment}>
        <div>
          <input
            id='comment'
            type = "text"
            value = {commentToAdd}
            name = "comment"
            onChange = {({ target }) => setCommentToAdd(target.value)}
          />
          <Button id = "add-comment" type="submit" >add comment</Button>
        </div>


      </form>
      <h2> comments </h2>
      <ul>
        {blogsComments.map(comment => <li key = {comment.id}> {comment.comment} </li>)}
      </ul>

    </Layout>
  )
}


export default Comments
