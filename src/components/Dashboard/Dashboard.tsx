import { useState } from 'react';
import data from '../../data/data.json';
import { Button, Stack } from '@mui/material';
import PageLayout from '../PageLayout/PageLayout';
import { resetLocalData, uploadMagnetData } from '../../utils/localDataUtils';
import { MagnetData } from '../../types';

export default function Dashboard() {
  const [isInitialised, setIsInitialised] = useState(
    localStorage.getItem('init')
  );

  function initialiseLocalData() {
    const magnetData: MagnetData[] = JSON.parse(JSON.stringify(data));
    uploadMagnetData(magnetData);
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
        <Button
          variant="contained"
          color="secondary"
          sx={{ maxWidth: 300 }}
          onClick={resetData}
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
