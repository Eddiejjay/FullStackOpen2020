
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import bookservice from './service/bookservice'







const Person = (props)=> {

return (
  <li>{props.person.name} {props.person.number}
  <button onClick ={props.handleDeleteClick}> delete </button>
  </li>
)

}


const Show = (props) => {
  

  const show = props.searchText === '' 
  ? props.persons
  : props.persons.filter(person=>person.name.toLowerCase().includes(props.searchText.toLowerCase()))


  return (
    <div>
    <ul>{show.map((person) =>
      <Person key = {person.name} person = {person} handleDeleteClick = {() => props.handleDeleteClick(person.id, person.name)} />
      )}
      
    </ul>

    </div>
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

    let personX = props.persons.find(person => person.name === props.newName)
    let changedPerson = {...personX, number:props.newNumber}

    
    if (personX!= undefined){
    window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)?
   
   bookservice
   .redo(personX.id,changedPerson)
      .then(returnedPerson => { props.setPersons(props.persons.map(person=> person.id !== returnedPerson.id?person:returnedPerson))})
  
    :
    props.setNewName('')
    props.setNewNumber('')
    }else {
      bookservice
      .create(person)
      .then(newPerson => {
        props.setPersons(props.persons.concat(newPerson))
      })
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
    <button type="submit" >add</button>
  </div>


</form>
</div>

)

}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchText, setSearchText] = useState('')

useEffect(() => {
console.log('efekti alkaa')
bookservice
.getAll()
.then(persons => {
  setPersons(persons)
})

} , [] )



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

  const handleDeleteClick = (id, name) => {
    let result = window.confirm(`Delete ${name}?`)

    if (result === true ){
    bookservice
    .remove(id)
    setPersons(persons.filter(person => person.id !== id))
   console.log(id) }

     else {
    return
   }
  }

  const checkNameBook = (newName) => {

  if   (persons.some(person => person.name === newName)) {
    window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
  }
else {
  console.log('jee')} 




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
        setPersons = {setPersons} 
        searchText = {searchText}
        checkNameBook = {checkNameBook}
       />
        
      <h2>Numbers</h2>

      <Show persons = {persons} searchText={searchText}  handleDeleteClick = {handleDeleteClick} /> 
      

    </div>
  )

}

export default App