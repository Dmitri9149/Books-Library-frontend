import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import {ALL_AUTHORS, ALL_BOOKS} from './queries'

const App = () => {

  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks  = useQuery(ALL_BOOKS)

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  console.log("resultAuthors data", resultAuthors.data)
  console.log("resultBooks data", resultBooks.data)

  const flattenBooks = resultBooks.data.allBooks.map(b => 
    { const { title, published, author } = b   
      const bookFlatten = { 
        title, 
        published, 
        bookCount: author.bookCount,
        authorName: author.name,
        authorBorn: author.born
      }
      return bookFlatten
    } )

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
        <Route path="/books" element={<Books books={ flattenBooks } />} />
        <Route path="/add_book" element={<NewBook />} />
      </Routes>
    </div>

  )
}

export default App