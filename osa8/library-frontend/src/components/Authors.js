import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'


const Authors = ({ show, authors, token }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [setBornTo, setSetBornTo] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })
  const options = authors.map(a=> a.name).map(a => ({ value: a, label: a }))
  console.log('authir', options)


  if (!show) {
    return null
  }

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption.value)
    console.log(`Option selected:`, selectedOption);
  };


  const submit = (event) => {
    event.preventDefault()
    const name = selectedOption
    editAuthor({  variables: { name, setBornTo  } })
    console.log('editing author..')
    setSetBornTo('')
    setSelectedOption(null)

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
     {token &&  <form onSubmit={submit}>
        <h1> Set birthyear</h1>
        <div>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <Select 
           options ={options} 
           defaultValue={selectedOption}
               onChange ={handleChange}>

           </Select>
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(parseInt(target.value))}
          />
        </div>


        <button type='submit'>update author</button>
      </form>}
    </div>
  )
}

export default Authors