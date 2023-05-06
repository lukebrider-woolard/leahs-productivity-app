// React
import { useNavigate } from 'react-router-dom';

// Material UI
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

// Components
import PageLayout from '../PageLayout/PageLayout';
import { readLocalData } from '../../utils/localDataUtils';
import { SalesData } from '../../types';

export default function PreviousOrdersPage() {
  const salesData = readLocalData<SalesData>('salesData');
  const navigate = useNavigate();

  function openSalesPageWithPreviousOrder(row: GridRowParams) {
    const saleId = row.id;
    const sale = salesData.find((sale) => sale.id === saleId);

    if (sale !== undefined) {
      const stringifiedIds = sale.magnets.join(',');
      navigate(`/sales/${stringifiedIds}`);
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date of Sale',
      width: 250,
      filterable: false,
    },
    {
      field: 'magnets',
      headerName: 'Magnet IDs',
      minWidth: 150,
      flex: 1,
      filterable: false,
    },
  ];

  const rows = salesData.map((sale) => {
    return {
      id: sale.id,
      date: sale.date,
      magnets: sale.magnets.join(','),
    };
  });

  function render() {
    return (
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          sorting: {
            sortModel: [{ field: 'date', sort: 'desc' }],
          },
        }}
        disableVirtualization={true}
        onRowClick={(e) => openSalesPageWithPreviousOrder(e.row)}
      />
    );
  }

  return (
    <>
      <PageLayout pageTitle="Previous Orders" child={render()} />
    </>
  );
}
