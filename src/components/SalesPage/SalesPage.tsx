import { useEffect, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import {
  Badge,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import PageLayout from '../PageLayout/PageLayout';
import {
  readMagnetData,
  getUniqueBundles,
  uploadMagnetData,
  uploadSalesData,
} from '../../utils/localDataUtils';
import { MagnetData, SalesData } from '../../types';

export default function SalesPage() {
  const [rawMagnetList, setRawMagnetList] = useState<string>('');
  const [buyerCountry, setBuyerCountry] = useState<string>('');
  const [magnetIdArray, setMagnetIdArray] = useState<string[]>([]);
  const [magnetCount, setMagnetCount] = useState<number>(0);

  const magnetData = readMagnetData();

  useEffect(() => {
    function rawStringListToArray() {
      return rawMagnetList
        .split(',')
        .map((magnet) => magnet.trim())
        .filter((magnet) => magnet.length !== 0);
    }
    const convertToList = rawStringListToArray();

    setMagnetIdArray(convertToList);
    setMagnetCount(convertToList.length);
  }, [rawMagnetList]);

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

  function generateMagnetList() {
    let arrayOfMagnets: MagnetData[] = [];

    magnetIdArray.forEach((id) => {
      const result = magnetData.find((magnet) => {
        return magnet.id === id;
      });

      if (result !== undefined) {
        arrayOfMagnets.push(result);
      }
    });

    return arrayOfMagnets.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  function generateUpdatedMagnetStock(
    originalData: MagnetData[],
    selectedMagnets: string[]
  ) {
    const updated: MagnetData[] = originalData.map((magnet) => {
      if (selectedMagnets.includes(magnet.id)) {
        return {
          ...magnet,
          stock: --magnet.stock,
          sold: ++magnet.sold,
          countries: magnet.countries.includes(buyerCountry)
            ? magnet.countries
            : magnet.countries.concat(buyerCountry),
        };
      } else {
        return magnet;
      }
    });

    return updated;
  }

  function generateSalesData(selectedMagnets: string[]) {
    const date = new Date();

    const salesData: SalesData = {
      id: Math.floor(Math.random() * 100000000).toString(),
      date: date.toISOString().split('T')[0],
      magnets: selectedMagnets,
    };

    return salesData;
  }

  function resetState() {
    setRawMagnetList('');
    setBuyerCountry('');
  }

  function processMagnetPurchase() {
    const updatedData = generateUpdatedMagnetStock(magnetData, magnetIdArray);
    uploadMagnetData(updatedData);

    const salesData = generateSalesData(magnetIdArray);
    uploadSalesData(salesData);

    resetState();
  }

  function renderBundleButtons() {
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

  function renderListRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    if (data[index] !== undefined) {
      return (
        <ListItem style={style} key={data[index].id}>
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
              <>
                <Badge
                  color="secondary"
                  badgeContent={magnetCount}
                  sx={{ mr: 1 }}
                />
                <IconButton
                  aria-label="clear magnet date"
                  onClick={() => setRawMagnetList('')}
                >
                  <ClearIcon />
                </IconButton>
              </>
            ),
          }}
        />
        <Stack direction={'row'} spacing={2} sx={{ mt: 2 }}>
          {renderBundleButtons()}
        </Stack>
        <Stack direction={'row'} spacing={2} sx={{ mt: 5 }}>
          <Box
            sx={{
              width: '100%',
              height: 600,
              maxWidth: 500,
            }}
          >
            <FixedSizeList
              height={600}
              width={500}
              itemSize={60}
              itemCount={magnetCount}
              overscanCount={5}
              itemData={generateMagnetList()}
            >
              {renderListRow}
            </FixedSizeList>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: 600,
              maxWidth: 500,
            }}
          >
            <TextField
              id="country"
              label="Buyer Country"
              variant="outlined"
              sx={{ minWidth: '50%' }}
              value={buyerCountry}
              onChange={(e) => setBuyerCountry(e.target.value)}
            />
            <Button
              key="Complete"
              variant="contained"
              color="secondary"
              sx={{ ml: 2, mt: 1 }}
              onClick={processMagnetPurchase}
              disabled={!rawMagnetList || !buyerCountry}
            >
              Complete
            </Button>
          </Box>
        </Stack>
      </>
    );
  }

  return (
    <>
      <PageLayout pageTitle="Sales" child={render()} />
    </>
  );
}
