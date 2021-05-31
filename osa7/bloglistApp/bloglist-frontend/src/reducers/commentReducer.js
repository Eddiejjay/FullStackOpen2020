import blogService from '../services/blogs'


export const initializeComments = () => {
  return async dispatch => {
    const comments = await blogService.getAllComments()
    dispatch ({
      type: 'ALLCOMMENTS',
      comments : comments

    }
    )
  }}

const initialComments = []

const commentReducer = (state  = initialComments, action) => {
  switch (action.type)
  {case 'ALLCOMMENTS':
    return state = action.comments
  default:
    return state
  }
}
export default commentReducer