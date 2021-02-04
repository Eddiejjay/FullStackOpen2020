
import React, { useState } from 'react'






const Person = ({person})=> {

return (
  <li>{person.name} {person.number}
  </li>
)

}


const Show = (props) => {

  const show = props.searchText === '' 
  ? props.persons
  : props.persons.filter(person=>person.name.toLowerCase().includes(props.searchText.toLowerCase()))


  return (

    <ul>{show.map((person) =>
      <Person key = {person.name} person = {person}/>
      )}
    </ul>

  )



  
}

const Filter = (props) => (
  <div> 
        filter shown with <input
        value = {props.searchText}
        onChange = {props.handleSearchTextChange}
        />
      </div>

)




const AddPerson = (props) => {

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name:props.newName,
      number:props.newNumber
    }

    if (props.persons.some(person => person.name === props.newName)){
    alert(`${props.newName} is already added to phonebook`)
    props.setNewName('')
    props.setNewNumber('')
    }else {
     props.setPersons(props.persons.concat(person))
     props.setNewName('')
     props.setNewNumber('')

    console.log('button clicked', event.target)
  }}

return (
<div>
  
  <form onSubmit ={addPerson}>
        
  <div>
    name: <input 
    value={props.newName}
    onChange={props.handleNameChange} />
  </div>


  <div>
    number: <input 
    value={props.newNumber}
    onChange={props.handleNumberChange}/>
  
  </div>
  <div>
    <button type="submit">add</button>
  </div>


</form>
</div>

)

}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchText, setSearchText] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchTextChange = (event) => {
    console.log(event.target.value)
    setSearchText(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>


      <Filter searchText = {searchText} handleSearchTextChange = {handleSearchTextChange}/>

      <h1>add new </h1>
      
      <AddPerson 
        newName = {newName} newNumber ={newNumber} 
        setNewName ={setNewName} setNewNumber = {setNewNumber}
        persons = {persons} handleNameChange = {handleNameChange} 
        handleNumberChange = {handleNumberChange} handleSearchTextChange = {handleSearchTextChange} 
        setPersons = {setPersons} />
        
      <h2>Numbers</h2>

      <Show persons = {persons} searchText={searchText} /> 

    </div>
  )

}

export default App