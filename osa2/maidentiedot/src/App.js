
import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

/*const CountryName = (props) => {
  return (
    <li> <h1>{props.name} </h1>{props.name} {props.capital}</li>
  )
}
*/

/* const Person = ({person})=> {

  return (
    <li>{person.name} {person.number}
    </li>
  )
  
  }
  */
 const Country = ({country}) => {
  

  return (
  <div> 
    <h1>{country.name} </h1>
    <p> capital {country.capital} </p>
    <p> population {country.population} </p>
    <h1>languages</h1>
    <ul>  {country.languages.map(language => <li key = {language.name}> {language.name}</li>) }</ul>
    <img src = {country.flag}  width={300} height={200} />
    
      </div>

  )


 }

const Show = (props) => {
  

let returnValue = (x) => {
  console.log('return value alkaa ')
  console.log('x.length ', x.length)


switch (true) {
 
  case x.length > 10:
    console.log('yli 10')
     return 'Too many matches, specify another filter';
     
  case x.length <= 10 && x.length > 1:
    console.log('alle 10 yli 1')
      return <div> 
              <ul> {props.filteredCountries.map((country) => 
              <li key = {country.name}>  {country.name}
              <button onClick= {props.handleClick}> show </button>
              
              </li>)}
              </ul>
              </div> 

  case x.length === 1:
    console.log('yksi')
    let country = x[0]
    console.log(' maa on ', country.name)

  return <Country country = {country}/>

}
}
  
return (
  <div>
  <div>{returnValue(props.filteredCountries)}</div>
  {console.log(returnValue('finaali',props.filteredCountries))}

  </div>
)
  }






function App() {
const [data, setData] = useState([])
const [searchText , setSearchText] = useState('')

let filteredCountries = 
data.filter(country=>country.name.toLowerCase().includes(searchText.toLowerCase()))
  
useEffect(() => {
  axios
  .get("https://restcountries.eu/rest/v2/all")
  .then(response => {
    setData(response.data)
  }
  )
  } ,[] )
  


const handleClick = () => {
  console.log('nappia painettu')

}


const handleOnChange =(event) => {
  console.log(event.target.value)
  setSearchText(event.target.value)
}





  return (
    <div>find countries <input
    onChange = {handleOnChange}
    /> 
    <div> 
  
       </div>
    <Show data = {data} searchText = {searchText} filteredCountries = {filteredCountries} handleClick = {handleClick} />

    </div>


  )

}

export default App;
