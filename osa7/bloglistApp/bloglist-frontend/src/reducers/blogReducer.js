export const initializeBlogs = (blogs) => {
  return {
    type: 'INITBLOGS',
    blogs : blogs
  }
}




const blogReducer = (state  = [], action) => {
  switch (action.type)
  {case 'INITBLOGS':
    return state = action.blogs
  default:
    return state
  }
}
export default blogReducer