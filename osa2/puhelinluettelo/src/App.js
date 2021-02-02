
import React, { useState } from 'react'


const Person = ({person})=> {

return (
  <li>{person.name}
  </li>
)

}


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [nameInBookAlready, setNameInBookAlready] = useState(false)
 

/*
  const redAlert = () => { 
    console.log('toimiko2')
  
    persons.includes(newName) ? alert(`${newName} is already added to phonebook`): addPerson()
    console.log('toimooki3')
    
  }
  */

  

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name:newName
    }


   /* persons.includes(newName)? alert(`${newName} is already added to phonebook`):
*/

if (persons.some(person => person.name === newName)){
  alert(`${newName} is already added to phonebook`)
  setNewName('')
}else {
    setPersons(persons.concat(person))
    setNewName('')
    console.log('button clicked', event.target)
  }}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>


      <form onSubmit ={addPerson}>
        
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>


      </form>


      <h2>Numbers</h2>

      <ul>{persons.map((person) =>
        <Person key = {person.name} person = {person}/>
        )}

      </ul>
      
    </div>
  )

}

export default App