// import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import data from '../../data/data.json';
import { MagnetData } from '../../types';

const magnetData: MagnetData[] = JSON.parse(JSON.stringify(data));

export default function DataPage() {
  // const [rows, setRows] = useState([]);
  
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
        stock: magnet.stock.toString(),
        bundles: magnet.bundles.join(', '),
        sold: magnet.sold.toString(),
        countries: magnet.countries.join(', ')
      }
    )
  });

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
