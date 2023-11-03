import { useState } from 'react'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RecommendedToUser from './components/RecommendedToUser'
import { ALL_AUTHORS, ALL_BOOKS, USER } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  console.log("Token", token)


  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks  = useQuery(ALL_BOOKS)
  const user = useQuery(USER,  {skip: !token} )

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (resultAuthors.loading || resultBooks.loading || user.loading ) {
    return <div>loading...</div>
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  console.log("resultAuthors data", resultAuthors.data)
  console.log("resultBooks data", resultBooks.data)
  console.log("result USER data", user.data)

  const flattenBooks = resultBooks.data.allBooks.map(b => 
    { const { title, published, author, genres } = b   
      const bookFlatten = { 
        title, 
        published, 
        bookCount: author.bookCount,
        authorName: author.name,
        authorBorn: author.born,
        genres
      }
      return bookFlatten
    } )

  const padding = {
    padding: 5
  }

  const loginView = () => {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <div>
          <Link style={padding} to="/authors">authors</Link>
          <Link style={padding} to="/books">books</Link>
          <Link style={padding} to="/login">login</Link>
          <Link style={padding} to="/">home</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/authors" element={<Authors authors={resultAuthors.data.allAuthors}/>} />
          <Route path="/books" element={<Books books={ flattenBooks } />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setError={notify} />} />
        </Routes>
      </div>
    )
  }

  const userView = () => {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <div>
          <Link style={padding} to="/add_book">add book</Link>
          <Link style={padding} to="/recommend">recommended</Link>
          <Link style={padding} to="/authors">authors</Link>
          <Link style={padding} to="/books">books</Link>
          <Link style={padding} to="/logout">logout</Link>
        </div>

        <Routes>
          <Route path="/authors" element={<Authors authors={resultAuthors.data.allAuthors}/>} />
          <Route path="/books" element={<Books books={ flattenBooks } />} />
          <Route path="/recommend" element={
            <RecommendedToUser  
              favoriteGenre={user.data.me.favoriteGenre} />} />
          <Route path="/add_book" element={<NewBook />} />
          <Route path="/logout" element={
            <div>
              <h2>Logout</h2>
              <button onClick={logout}>logout</button>
              </div>} />
        </Routes>
      </div>
    )
  }

  return (
    <div>
      { 
        !token 
        ? loginView()
        : userView()   
      }
    </div>
  )
}

export default App