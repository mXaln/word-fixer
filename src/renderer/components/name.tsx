/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../css/name.css';
import CloseIcon from '@mui/icons-material/Close';
import strongRefs from '../../../assets/strongs.json';

interface NameProps {
  name: string;
  strongs: string[];
  onExit: () => void;
}

export default function Name({ name, strongs, onExit }: NameProps) {
  return (
    <div className="name">
      <div className="title">{name}</div>
      <div className="references">
        {strongs.map((strong) => (
          <div>
            <h3>{strong}</h3>
            <div>
              References:{' '}
              {strongRefs[strong as keyof typeof strongRefs].join(', ')}
            </div>
          </div>
        ))}
      </div>
      <CloseIcon onClick={onExit} className="exit" />
    </div>
  );
}
