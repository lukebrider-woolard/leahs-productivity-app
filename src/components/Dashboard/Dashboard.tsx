import data from '../../data/data.json';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import PageLayout from '../PageLayout/PageLayout';
import { MagnetData } from '../../types';

export default function Dashboard() {
  const [isInitialised, setIsInitialised] = useState(
    localStorage.getItem('init')
  );

  function initialiseLocalData() {
    const magnetData: MagnetData[] = JSON.parse(JSON.stringify(data));
    localStorage.setItem('magnetData', JSON.stringify(magnetData));
    localStorage.setItem('init', 'true');
    setIsInitialised('true');
  }

  function resetLocalData() {
    localStorage.clear();
    localStorage.setItem('init', 'false');
    setIsInitialised('false');
  }

  function render() {
    let button;
    if (isInitialised === 'true') {
      button = (
        <Button
          variant="contained"
          color="secondary"
          sx={{ maxWidth: 300 }}
          onClick={resetLocalData}
        >
          Reset Local Storage
        </Button>
      );
    } else {
      button = (
        <Button
          variant="contained"
          color="secondary"
          sx={{ maxWidth: 300 }}
          onClick={initialiseLocalData}
        >
          Initialise App Data
        </Button>
      );
    }

    return (
      <Stack direction="row" justifyContent="center">
        {button}
      </Stack>
    );
  }

  return <PageLayout pageTitle="Dashboard" child={render()} />;
}
