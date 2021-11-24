import { gql } from '@apollo/client'

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String, $setBornTo: Int) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    bookCount
    born
  }
}
  `




export const ADD_BOOK = gql`
mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author {
      name
      bookCount
      born
    }
    genres
    id
  }
}

`

export const LOGIN = gql `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}

`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`