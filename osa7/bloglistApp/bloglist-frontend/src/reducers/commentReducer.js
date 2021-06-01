import blogService from '../services/blogs'


export const initializeComments =  () => {
  return async dispatch => {
    const comments = await blogService.getAllComments()
    dispatch ({
      type: 'ALLCOMMENTS',
      comments : comments

    }
    )
  }}

export const addComment = (comment, id) => {
  return async dispatch => {
    const returnedComment = await blogService.addComment(comment, id)
    console.log(returnedComment)

    dispatch ({
      type: 'ADDCOMMENT',
      comment : returnedComment

    }
    )
  }}



const initialComments = []

const commentReducer = (state  = initialComments, action) => {
  switch (action.type)
  {case 'ALLCOMMENTS':
    return state = action.comments
  case 'ADDCOMMENT':
    return state.concat(action.comment)
  default:
    return state
  }
}
export default commentReducer