import data from '../../data/data.json';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import PageLayout from '../PageLayout/PageLayout';
import { MagnetData } from '../../types';

export default function Dashboard() {
  const [isInitialesed, setIsInitialised] = useState(localStorage.getItem('init'));

  function initialiseLocalData() {
    const magnetData: MagnetData[] = JSON.parse(JSON.stringify(data));
    localStorage.setItem('magnetData', JSON.stringify(magnetData));
    localStorage.setItem('init', 'true');
    setIsInitialised('true')
  }

  function resetLocalData() {
    localStorage.clear();
    localStorage.setItem('init', 'false');
    setIsInitialised('false');
  }

  function render() {
    let button;
    if (isInitialesed === 'true') {
      button = <Button 
      variant='contained'
      color='secondary'
      onClick={resetLocalData}
    >
      Reset Local Storage
    </Button>
    } else {
      button = <Button 
        variant='contained'
        color='secondary'
        onClick={initialiseLocalData}
      >
        Initialise App Data
      </Button>
    }

    return (
      <Stack justifyContent='space-around'>
        {button}
      </Stack>
    )
  }

  return (
    <PageLayout pageTitle='Dashboard' child={render()} />
  )
}
