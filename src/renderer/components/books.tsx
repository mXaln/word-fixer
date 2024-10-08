import CloseIcon from '@mui/icons-material/Close';
import '../css/books.css';
import { Result } from 'app';
import _ from 'underscore';

interface BooksProps {
  results: Result[];
  goHome: () => void;
}

export default function Books({ results, goHome }: BooksProps) {
  const books = _.groupBy(results, (result) => result.bookSlug);

  const renderBook = (bookName: string, refs: any[]) => {
    return (
      <>
        <h3>{bookName}</h3>
        <ul>
          {refs.map((ref) => (
            <li key={ref.name} className="bookItem">
              <span className="bookReference">{ref.ref}</span>
              <span className="bookStrong">{` (${ref.name} ${ref.strong}): `}</span>
              <span>{ref.text}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="books">
      {Object.keys(books).map((book) => renderBook(book, books[book]))}
      <CloseIcon onClick={goHome} className="exit" />
    </div>
  );
}
