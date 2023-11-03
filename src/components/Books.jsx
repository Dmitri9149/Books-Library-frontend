import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { BOOKS_IN_GENRE } from '../queries'
const Books = ({books}) => {
  const client = useApolloClient()
  console.log("BOOKS imported", books)
  const [genre, setGenre] = useState("all genres")
  const getGenres = books.map(b => b.genres).flat()
// from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const allGenres = [...new Set(getGenres)].concat(['all genres']) 
//  const booksToShow = books.filter(book => genre === 'all genres' ?book :book.genres.some(g => g === genre))
 console.log("allGenres!!!!!!!!!", allGenres, getGenres)
  console.log("Genre", genre)

  const resultBooks = useQuery(BOOKS_IN_GENRE, 
    {variables: {genre}})


  if (resultBooks.loading) {
    return <div>loading...</div>
  }

  console.log("Books.data in Books", resultBooks.data)

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

//    const getGenres = flattenBooks.map(b => b.genres).flat()
//    const allGenres = [...new Set(getGenres)].concat(['all genres']) 

  return (
    <div>
      <h2>books</h2>
      <div>in genre:  {genre} </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {flattenBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.authorName}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((genre) => (
          <button onClick={() => {client.resetStore(); setGenre(genre)} }>{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books