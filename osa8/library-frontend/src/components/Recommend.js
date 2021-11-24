import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../queries'

const Recommend = ({ show, books }) => {
    const result = useQuery(CURRENT_USER)
    const favoriteGenre =  result.data.me.favoriteGenre

    const booksToShow =  books.filter(b => b.genres.includes(favoriteGenre))

    if (!show) {
        return null
      }

    return (
        <div>
        <h1>Recommendations</h1>
        {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </div>
    )
}

export default Recommend
