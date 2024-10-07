/* eslint-disable no-restricted-syntax */
import '../css/home.css';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Result from '../../types';
import Books from './books';

export default function Main() {
  const [searching, setSearching] = useState<boolean>(false);
  const [data, setData] = useState<Result[]>([]);

  const openDirectory = async () => {
    const directory =
      await window.electron.ipcRenderer.openSelectDirectoryDialog();
    if (directory) {
      setSearching(true);
      window.electron.ipcRenderer.processDirectory(directory);
    }
  };

  useEffect(() => {
    return window.electron.ipcRenderer.onDirectoryResult((result: Result[]) => {
      setSearching(false);
      setData(result);
    });
  });

  const renderContent = () => {
    if (searching) {
      return (
        <div>
          <div>Searching...</div>
          <Button onClick={() => setSearching(false)}>Cancel</Button>
        </div>
      );
    }

    return data.length > 0 ? (
      <Books
        result={data}
        goHome={() => {
          setData([]);
        }}
      />
    ) : (
      <Button color="inherit" onClick={openDirectory}>
        Open USFM Directory
      </Button>
    );
  };

  return <div className="main">{renderContent()}</div>;
}
