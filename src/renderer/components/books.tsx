import CloseIcon from '@mui/icons-material/Close';
import Result from '../../types';
import '../css/books.css';

interface BooksProps {
  result: Result[];
  goHome: () => void;
}

export default function Books({ result, goHome }: BooksProps) {
  return (
    <div className="books">
      <ul>
        {result.map((name) => (
          <li>{`${name.ref} (${name.name} ${name.strong}): ${name.text}`}</li>
        ))}
      </ul>
      <CloseIcon onClick={goHome} className="exit" />
    </div>
  );
}
