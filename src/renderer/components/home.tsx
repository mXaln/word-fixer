/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../css/home.css';
import { useState } from 'react';
import { Button } from '@mui/material';
import Name from './name';
import namesToStrongs from '../../../assets/names_to_strongs.json';

export default function Home() {
  const [selectedName, setSelectedName] = useState<string>('');

  const selectName = (name: string) => {
    setSelectedName(name);
  };

  return (
    <div className="home">
      {selectedName !== '' ? (
        <Name
          name={selectedName}
          strongs={namesToStrongs[selectedName as keyof typeof namesToStrongs]}
          onExit={() => selectName('')}
        />
      ) : (
        Object.keys(namesToStrongs)
          .sort()
          .map((name) => (
            <Button
              key={name}
              className="nameItem"
              color="inherit"
              variant="text"
              size="small"
              onClick={() => selectName(name)}
            >
              {name}
            </Button>
          ))
      )}
    </div>
  );
}
