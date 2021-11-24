
import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState('')
  const booksToShow = !filter? books : books.filter(b => b.genres.includes(filter))

  console.log('filter', filter)
  



  if (!show) {
    return null
  }






  return (
    <div>
      <h2>books</h2>
    <button onClick = {() => setFilter("refactoring")}>refactoring</button>
    <button onClick = {() => setFilter("agile")}>agile</button>
    <button onClick = {() => setFilter("patterns")}>patterns</button>
    <button onClick = {() => setFilter("design")}>design</button>
    <button onClick = {() => setFilter("crime")}>crime</button>
    <button onClick = {() => setFilter("classic")}>classic</button>
    <button onClick = {() => setFilter("")}>all genres</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books