import { useState } from 'react'
const Books = ({books}) => {
  console.log("BOOKS", books)
  const [genre, setGenre] = useState('all genres')
  const getGenres = books.map(b => b.genres).flat()
// from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const allGenres = [...new Set(getGenres)].concat(['all genres']) 
  const booksToShow = books.filter(book => genre === 'all genres' ?book :book.genres.some(g => g === genre))
  console.log("allGenres!!!!!!!!!", allGenres, getGenres)
  console.log("Genre", genre)

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
          {booksToShow.map((b) => (
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
          <button onClick={() => setGenre(genre)}>{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books