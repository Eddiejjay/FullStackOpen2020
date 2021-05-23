

// Action creator
export const createNotification = (message) => {
  return {
    type: 'NOTIFICATION',
    notificationMessage : message
  }

}




const notificationReducer = (state  = '', action) => {
  switch (action.type)
  {case 'NOTIFICATION':
    return state = action.notificationMessage
  default:
    return state
  }
}
export default notificationReducer