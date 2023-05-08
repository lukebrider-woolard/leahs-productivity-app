// React
import { useState } from 'react';

// Material UI
import { Button, Stack } from '@mui/material';

// Components
import PageLayout from '../PageLayout/PageLayout';
import {
  resetLocalData,
  initialiseLocalData,
  printLocalData,
} from '../../utils/localDataUtils';

export default function Dashboard() {
  const [isInitialised, setIsInitialised] = useState(
    localStorage.getItem('init')
  );

  function initialiseLocalMagnetData() {
    initialiseLocalData();
    setIsInitialised('true');
  }

  function resetData() {
    resetLocalData();
    setIsInitialised('false');
  }

  function render() {
    let button;
    if (isInitialised === 'true') {
      button = (
        <>
          <Button
            variant="contained"
            color="secondary"
            sx={{ maxWidth: 300 }}
            onClick={resetData}
          >
            Reset Local Storage
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ maxWidth: 300 }}
            onClick={() => {
              printLocalData();
            }}
          >
            Write Stored Data To Console
          </Button>
        </>
      );
    } else {
      button = (
        <Button
          variant="contained"
          color="secondary"
          sx={{ maxWidth: 300 }}
          onClick={initialiseLocalMagnetData}
        >
          Initialise App Data
        </Button>
      );
    }

    return (
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        {button}
      </Stack>
    );
  }

  return <PageLayout pageTitle="Dashboard" child={render()} />;
}
