import { useNavigate } from 'react-router-dom';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PageLayout from '../PageLayout/PageLayout';
import { readMagnetData } from '../../utils/localDataUtils';

export default function DataPage() {
  const navigate = useNavigate();
  const magnetData = readMagnetData();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      filterable: false,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 120,
      filterable: false,
    },
    {
      field: 'bundles',
      headerName: 'Bundles',
      minWidth: 150,
      flex: 1,
      filterable: false,
    },
    {
      field: 'sold',
      headerName: 'Number Sold',
      width: 180,
      filterable: false,
    },
    {
      field: 'countries',
      headerName: 'Sold to Countries',
      width: 300,
      filterable: false,
    },
    {
      field: 'numberToPrint',
      headerName: 'Recommended for Print',
      minWidth: 250,
      flex: 1,
      filterable: false,
    },
  ];

  function calculatePrintValue(stock: number, sold: number) {
    const result = sold / 4 - stock;

    return Math.min(Math.max(Math.round(result), 0), 8);
  }

  const rows = magnetData.map((magnet) => {
    return {
      id: magnet.id,
      name: magnet.name,
      stock: magnet.stock,
      bundles: magnet.bundles.join(', '),
      sold: magnet.sold,
      countries: magnet.countries.join(', '),
      numberToPrint: calculatePrintValue(magnet.stock, magnet.sold),
    };
  });

  function render() {
    return (
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
        disableVirtualization={true}
      />
    );
  }

  return (
    <>
      <PageLayout pageTitle="Magnets Data Display" child={render()} />
      <Tooltip title="Add Magnet">
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 30, right: 40 }}
          onClick={() => navigate('/add-magnet')}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
