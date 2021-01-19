import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticLine = (props) => {

return (
<tr>
  <td>{props.text}</td> 
  <td> {props.value}</td>
  </tr>


)



}
const Button = (props) => {

  return (
    <button onClick = {props.handleClick}>
      {props.text}
      </button>
  )
  
}




const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let avg = (props.good - props.bad) / all
  let positive = props.good/all * 100



if (all !== 0) {
return (

<table>
<tbody> 
<StatisticLine text='good'value={props.good}/>
<StatisticLine text='neutral'value={props.neutral}/>
<StatisticLine text='bad'value={props.bad}/>
<StatisticLine text='all'value={all}/>
<StatisticLine text='avg'value={avg}/>
<StatisticLine text='positive'value={positive + ' %'} />
</tbody>
</table>

)
}

return (
  <div>
<h1> Statistics </h1>
<p> No feedback given </p>
</div>

)
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    console.log('clickGood')
    setGood(good + 1)
  }
  
    const handleClickNeutral = () => {
      console.log('clickNeutral')
      setNeutral(neutral + 1)

    }
      const handleClickBad = () => {
        console.log('clickBad')
        setBad(bad + 1)

      }
     

  return (
    <div>
      <h1> Give feedback </h1>
    <Button handleClick = {handleClickGood}
    text = 'good'/>
    <Button handleClick = {handleClickNeutral}
    text = 'neutral'/>
     <Button handleClick = {handleClickBad}
    text = 'bad'/>

    <Statistics good = {good} bad = {bad} neutral = {neutral}/> 

    </div>
  )
  }

ReactDOM.render(<App />, 
  document.getElementById('root'))