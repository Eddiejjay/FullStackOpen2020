/* eslint-disable no-case-declarations */


import blogsService from '../services/blogs'


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch ( {
      type: 'INITBLOGS',
      blogs : blogs

    })}}





export const addLikeToStore = ( id ) => {
  return {
    type: 'ADDLIKESTORE',
    id : id
  }
}

export const addNewBlogStore = ( blog, user) => {
  return async dispatch => {

    blogsService.setToken(user.token)
    const newBlog =  await blogsService.create(blog)
    // blogFormRef.current.toggleVisibility()
    dispatch({
      type:'NEWBLOG',
      blog : newBlog
    })


  }}

export const deleteBlog = ( id ) => {
  return {
    type: 'DELETEBLOG',
    id: id
  }
}

const blogReducer = (state  = [], action) => {
  switch (action.type)
  {case 'INITBLOGS':
    return state = action.blogs
  case  'ADDLIKESTORE':
    // eslint-disable-next-line no-case-declarations
    const blogi = state.find(b => b.id === action.id)
    const updatedBlogi = { ...blogi, likes:blogi.likes +1 }
    return state = state.map(b => b.id !== updatedBlogi.id ? b :updatedBlogi)
  case 'NEWBLOG' :
    return [...state, action.blog]
  case 'DELETEBLOG':
    return state = state.map(b => b.id !== action.id && b)
  default:
    return state
  }
}
export default blogReducer