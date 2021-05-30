import userService from '../services/users'


export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch ({
      type: 'ALLUSERS',
      users :users

    }
    )
  }}

const initialUsers = []

const userReducer = (state  = initialUsers, action) => {
  switch (action.type)
  {case 'ALLUSERS':
    return state = action.users
  default:
    return state
  }
}
export default userReducer