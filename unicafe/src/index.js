import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = () => {(

   <button> "Jorma" </button>

  )
}





const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give feedback </h1>
      <Button/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)