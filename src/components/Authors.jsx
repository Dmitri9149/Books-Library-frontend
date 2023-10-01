import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import {ALL_AUTHORS, ALL_BOOKS} from '../App'

const SET_BORN_TO = gql`
mutation setBornTo($author: String!, $bornInYear: Int!) {
  editAuthor(name:$author, setBornTo:$bornInYear
    ) {
      name
      born
      bookCount
      id
    }
}
`
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

    console.log('set born...')

    setBorn('')
    setAuthor('')
  }
  
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
        <h2> Set birth year</h2>
        <form onSubmit={submit}>
          <div>
            author name 
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">create book</button>
        </form>
      </div>      
    </div>
  )
}

export default Authors