import { useState } from 'react';

import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { FixedSizeList, ListChildComponentProps } from 'react-window';

import PageLayout from '../PageLayout/PageLayout';
import { readMagnetData, getUniqueBundles } from '../Shared/readMagnetData';
import { MagnetData } from '../../types';

const magnetData = readMagnetData();

export default function SalesPage() {
  const [rawMagnetList, setRawMagnetList] = useState<string>('');

  function addMagnetsFromBundle(bundle: string) {
    const magnetsInBundle = magnetData.filter((magnet) =>
      magnet.bundles.includes(bundle)
    );
    const magnetCodes = magnetsInBundle
      .map((magnet) => magnet.id)
      .toString()
      .concat(',');

    setRawMagnetList((prevState) => prevState.concat(magnetCodes));
  }

  function bundleButtons() {
    const bundles = getUniqueBundles();

    return bundles.map((bundle) => (
      <Button
        key={bundle}
        variant="contained"
        color="secondary"
        onClick={() => addMagnetsFromBundle(bundle)}
      >
        {bundle}
      </Button>
    ));
  }

  function generateMagnetList() {
    const arrayOfMagnetIDs = rawMagnetList.split(',').map((element) => {
      return element.trim();
    });

    let arrayOfMagnets: MagnetData[] = [];

    arrayOfMagnetIDs.forEach((id) => {
      const result = magnetData.find((magnet) => {
        return magnet.id === id;
      });

      if (result !== undefined) {
        arrayOfMagnets.push(result);
      }
    });

    return arrayOfMagnets.sort();
  }

  function renderListRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    if (data[index] !== undefined) {
      return (
        <ListItem style={style} key={index}>
          <ListItemText
            primary={`${data[index].id} - ${data[index].name}`}
            secondary={`${data[index].stock} in stock`}
          />
        </ListItem>
      );
    } else {
      return <></>;
    }
  }

  function render() {
    return (
      <>
        <TextField
          id="sales"
          label="Input Magnet Codes"
          variant="outlined"
          sx={{ minWidth: '90%' }}
          value={rawMagnetList}
          onChange={(e) => setRawMagnetList(e.target.value)}
          helperText="Enter comma separated magnet codes to generate a list. Clicking a bundle will automatically add the codes."
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="clear magnet date"
                onClick={() => setRawMagnetList('')}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <Stack direction={'row'} spacing={2} sx={{ mt: 2 }}>
          {bundleButtons()}
        </Stack>
        <Box
          sx={{
            width: '100%',
            height: 600,
            maxWidth: 500,
            mt: 5,
          }}
        >
          <FixedSizeList
            height={600}
            width={500}
            itemSize={60}
            itemCount={rawMagnetList.split(',').length}
            overscanCount={5}
            itemData={generateMagnetList()}
          >
            {renderListRow}
          </FixedSizeList>
        </Box>
      </>
    );
  }

  return (
    <>
      <PageLayout pageTitle="Sales" child={render()} />
    </>
  );
}
