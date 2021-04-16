import React from 'react'
import '../index.css'


let errors = ['wrong']

const Notification= ({message}) => (



 errors.some(error => message.includes(error))

?<div className = "error" >
    {message}
  </div>  
:<div className = "notification" >
{message}
</div>  
)

export default Notification

