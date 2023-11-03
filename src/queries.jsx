import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
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
      bookCount
     }
     genres
    id
  }
}
`

export const BOOKS_IN_GENRE = gql`
query booksInGenre($genre: String!) {
  allBooks(genre:$genre) {
    title
    published
    author { 
      name
      born 
      bookCount
     }
     genres
    id
  }
}
`


export const SET_BORN_TO = gql`
mutation setBornTo($author: String!, $bornInYear: Int!) {
  editAuthor(name:$author, born:$bornInYear
    ) {
      name
      born
      bookCount
      id
    }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedNumber: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedNumber,
    genres: $genres
  ) {
    title
    author 
    {
      name
      born
      id
      bookCount
    }
    published
    genres
    id
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const USER = gql`
query {
  me{
    username
    favoriteGenre
  }
}
`