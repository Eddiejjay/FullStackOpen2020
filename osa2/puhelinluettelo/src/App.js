
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import bookservice from './service/bookservice'


const Notification = ({ message }) => {
  if (message === null) {
      return null
  }
  return (
      <div className="message">{message}</div>
  )
}



const ErrorNotification = ({ errorMessage}) => {
  if (errorMessage === null) {
      return null
  }
  return (
      <div className="error">{errorMessage}</div>
  )
}





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

    
    if (props.persons.find(person => person.name === props.newName)){
      if(window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)){
    
    bookservice
    .redo(personX.id,changedPerson)
      .then(returnedPerson => {
        props.setPersons(props.persons.map(person=> person.id !== returnedPerson.id?person:returnedPerson))
        props.setNewName('') 
        props.setNewNumber('')
        props.setMessage(
        `Changed number ${person.name}`
      )
      setTimeout(() => {
        props.setMessage(null)
      }, 3000)
    })
      .catch(error => { 
        props.setErrorMessage(
          `Information of ${person.name} has already been removed from server`
          ) 
           setTimeout(() => {
        props.setErrorMessage(null)
      }, 3000)
    })
  }
      
  props.setNewName('')
  props.setNewNumber('')
  
    }else {
      
      bookservice
      .create(person)
      .then(newPerson => {
        props.setPersons(props.persons.concat(newPerson))
        props.setPersons(props.persons.concat(person))
        props.setNewName('')
        props.setNewNumber('')
        props.setMessage(
         `Added ${person.name}`
       )
       setTimeout(() => {
         props.setMessage(null)
       }, 3000)
      }) .catch(error => {
        props.setErrorMessage(JSON.stringify(error.response.data))
        console.log(JSON.stringify(error.response.data))
         setTimeout(() => {
         props.setErrorMessage(null)
       }, 3000)
      })
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
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
   console.log(id) 
  setMessage(`Deleted ${name}`)
  setTimeout(() => {
    setMessage(null)
  }, 3000)
  
  
  }

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
      <Notification message={message}/>
      <ErrorNotification  errorMessage={errorMessage}/>

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
        setMessage = {setMessage}
        message = {message}
        setErrorMessage = {setErrorMessage}
        errorMessage = {errorMessage}
       />
        
      <h2>Numbers</h2>

      <Show persons = {persons} searchText={searchText}  handleDeleteClick = {handleDeleteClick} /> 
      

    </div>
  )

}

export default App