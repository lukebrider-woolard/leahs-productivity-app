import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import PageLayout from '../PageLayout/PageLayout';
import { readPreviousSales } from '../../utils/localDataUtils';

export default function PreviousOrdersPage() {
  const salesData = readPreviousSales();

  function render() {
    return (
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="previous sales table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date of Sale</TableCell>
              <TableCell align="right">Magnets Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.magnets.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <PageLayout pageTitle="Previous Orders" child={render()} />
    </>
  );
}
