import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PageLayout from '../PageLayout/PageLayout';
import { readMagnetData, getUniqueBundles } from '../../utils/localDataUtils';
import { MagnetData } from '../../types';

const magnetData = readMagnetData();

export default function AddMagnetForm() {
  const [magnetId, setMagnetId] = useState<string>('');
  const [magnetName, setMagnetName] = useState<string>('');
  const [noInStock, setNoInStock] = useState<string>('');
  const [bundles, setBundles] = useState<string[]>([]);
  const [availableBundles, setAvailableBundles] = useState<string[]>(
    getUniqueBundles()
  );
  const [modalOpen, setOpen] = useState(false);
  const [newBundleName, setNewBundleName] = useState<string>('');

  const navigate = useNavigate();

  function handleModalOpen() {
    setOpen(true);
  }

  function handleModalClose() {
    setNewBundleName('');
    setOpen(false);
  }

  function submitNewBundle() {
    setAvailableBundles([...availableBundles, newBundleName]);
    handleModalClose();
  }

  async function submitNewMagnet() {
    const newMagnet: MagnetData = {
      id: magnetId,
      name: magnetName,
      stock: +noInStock,
      bundles: bundles,
      sold: 0,
      countries: [],
    };

    const withAddition = magnetData.concat(newMagnet);

    const asJsonObject = JSON.stringify(withAddition);

    localStorage.setItem('magnetData', asJsonObject);
  }

  function handleSelectBundles(event: SelectChangeEvent<typeof bundles>) {
    const {
      target: { value },
    } = event;

    setBundles(typeof value === 'string' ? value.split(',') : value);
  }

  function renderAddBundleModal() {
    return (
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="add-new-bundle"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-new-bundle" variant="h6" component="h2">
            Add New Bundle
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <TextField
              id="new-bundle"
              label="New Bundle Name"
              variant="outlined"
              value={newBundleName}
              onChange={(e) => setNewBundleName(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={submitNewBundle}
              disabled={!newBundleName}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  }

  function renderForm() {
    return (
      <Box
        component="form"
        justifyContent="space-evenly"
        alignItems="center"
        display="flex"
        flexWrap="wrap"
        sx={{ pt: 10 }}
      >
        <TextField
          id="magnet-id"
          label="Magnet ID"
          variant="outlined"
          value={magnetId}
          onChange={(e) => setMagnetId(e.target.value)}
        />
        <TextField
          id="magnet-name"
          label="Magnet Name"
          variant="outlined"
          value={magnetName}
          onChange={(e) => setMagnetName(e.target.value)}
        />
        <TextField
          id="no-in-stock"
          label="Number In Stock"
          variant="outlined"
          type="number"
          value={noInStock}
          onChange={(e) => setNoInStock(e.target.value)}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="select-bundles-label">Bundles</InputLabel>
          <Select
            labelId="select-bundles-label"
            id="select-bundles"
            multiple
            value={bundles}
            onChange={handleSelectBundles}
            input={<OutlinedInput label="Bundles" />}
            renderValue={(selected: any) => selected.join(', ')}
          >
            {availableBundles.map((bundle) => (
              <MenuItem key={bundle} value={bundle}>
                {bundle}
              </MenuItem>
            ))}
          </Select>
          <Tooltip title="Add New Bundle">
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              sx={{ position: 'absolute', right: 20, top: 50 }}
              onClick={() => handleModalOpen()}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={submitNewMagnet}
          disabled={!magnetId || !magnetName || !noInStock || isNaN(+noInStock)}
        >
          Submit
        </Button>
      </Box>
    );
  }

  return (
    <>
      <PageLayout pageTitle="Add Magnet" child={renderForm()} />
      <Button
        variant="text"
        sx={{ position: 'fixed', top: 80, right: 20 }}
        onClick={() => navigate('/data-page')}
      >
        return to magnet data
      </Button>
      {renderAddBundleModal()}
    </>
  );
}
