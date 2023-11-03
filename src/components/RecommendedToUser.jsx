import { useQuery } from '@apollo/client'
import { BOOKS_IN_GENRE } from '../queries'
const RecommendedToUser = ({favoriteGenre}) => {
  const genre = favoriteGenre
  const resultBooks = useQuery(BOOKS_IN_GENRE, 
    {variables: {genre}})


  if (resultBooks.loading) {
    return <div>loading...</div>
  }

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



  return (
    <div>
      <h2>Recommended Books</h2>
      <div>in genre:  {favoriteGenre} </div>

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
    </div>
  )
}

export default RecommendedToUser