import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Fab, Tooltip } from '@mui/material';
import { darken, lighten, styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import PageLayout from '../PageLayout/PageLayout';
import { readPreviousSales } from '../../utils/localDataUtils';

export default function PreviousOrdersPage() {
  const salesData = readPreviousSales();

  function render() {
    return <></>;
  }

  return (
    <>
      <PageLayout pageTitle="Previous Orders" child={render()} />
    </>
  );
}
