// export const initializeBlogs = (blogs) => {
//   return {
//     type: 'INITBLOGS',
//     blogs : blogs
//   }
// }
// export const addLike = (blogObject , id ) => {
//   return {
//     type: 'ADDLIKE',
//     blogObject : blogObject,
//     id : id
//   }
// }


// const userReducer = (state  = {}, action) => {
//   switch (action.type)
//   {case 'LOGGEDINUSER':
//     return state = action.blogs
//   case  'ADDLIKE':
//     // eslint-disable-next-line no-case-declarations
//     const blogi = state.filter(b => b.id === action.id)
//     const updatedBlogi = { ...blogi, likes:blogi.likes +1 }
//     return state.map(b => b.id !== updatedBlogi.id ? b :updatedBlogi)
//   default:
//     return state
//   }
// }
// export default USERReducer