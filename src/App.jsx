import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
    id
  }
}
`

const App = () => {

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)


  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/add_book">new book</Link>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/books">books</Link>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors authors={resultAuthors.data.allAuthors}/>} />
        <Route path="/books" element={<Books books={resultBooks.data.allBooks} />} />
        <Route path="/add_book" element={<NewBook />} />
      </Routes>
    </div>

  )
}

export default App