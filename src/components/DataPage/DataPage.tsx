import { DataGrid, GridColDef } from '@mui/x-data-grid';

import PageLayout from '../PageLayout/PageLayout';

import data from '../../data/data.json';
import { MagnetData } from '../../types';

const magnetData: MagnetData[] = JSON.parse(JSON.stringify(data));

export default function DataPage() {
  const columns: GridColDef[] = [
    {
      field: 'id', headerName: 'ID', width: 100, filterable: false
    },
    {
      field: 'name', headerName: 'Name', width: 250, filterable: false
    },
    {
      field: 'stock', headerName: 'Stock', width: 120, filterable: false
    },
    {
      field: 'bundles', headerName: 'Bundles', minWidth: 150, flex: 1, filterable: false
    },
    {
      field: 'sold', headerName: 'Number Sold', width: 180, filterable: false
    },
    {
      field: 'countries', headerName: 'Sold to Countries', minWidth: 200, flex: 1, filterable: false
    }
  ]

  const rows = magnetData.map(magnet => {
    return (
      {
        id: magnet.id,
        name: magnet.name,
        stock: magnet.stock,
        bundles: magnet.bundles.join(', '),
        sold: magnet.sold,
        countries: magnet.countries.join(', ')
      }
    )
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
    )
  }

  return (
    <PageLayout pageTitle='Magnets Data Display' child={render()} />
  )
}
