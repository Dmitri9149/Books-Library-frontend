import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import {ALL_AUTHORS, ALL_BOOKS, SET_BORN_TO} from '../queries'

const Authors = ({authors}) => {

  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [ setBornTo ] = useMutation(SET_BORN_TO, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    const bornInYear = Number(born)

    setBornTo({  variables: { author, bornInYear } })

    setBorn('')
    setAuthor('')
  }

  const authorsNoBirthData = authors
    .filter( a => a.born === null)
    .map(a => <option key={a.id} value={a.name}>{a.name}</option>)
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3> Set birth year</h3>
        <form onSubmit={submit} defaultValue="select name">
          <div>
            <select 
              value={author}
              name="selectedAuthor"
              onChange={e => setAuthor(e.target.value)}
            >
              <option value="">select name</option>
              {authorsNoBirthData}
            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>      
    </div>
  )
}

export default Authors