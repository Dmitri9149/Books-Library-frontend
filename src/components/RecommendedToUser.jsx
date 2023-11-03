import { useQuery } from '@apollo/client'
import { USER } from '../queries'
const RecommendedToUser = ({books, favoriteGenre}) => {
  const user = useQuery(USER)
  console.log("Recommended USER", user)
  const booksToShow = books.filter(book => book.genres.some(g => g === favoriteGenre))

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
          {booksToShow.map((b) => (
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