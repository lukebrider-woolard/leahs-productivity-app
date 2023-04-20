import { useEffect, useState } from 'react';

import clsx from 'clsx';

import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams,
  GridCellParams,
} from '@mui/x-data-grid';
import { Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';

import PageLayout from '../PageLayout/PageLayout';
import { readMagnetData, uploadMagnetData } from '../../utils/localDataUtils';
import '../styles/MUIGridStyles.scss';

import { MagnetData } from '../../types';

export default function StockManagementPage() {
  const [originalMagnetData, setOriginalMagnetData] = useState<MagnetData[]>(
    readMagnetData()
  );
  const [updatedMagnetStock, setUpdatedMagnetStock] = useState<MagnetData[]>(
    readMagnetData()
  );
  const [rows, setRows] = useState<GridRowsProp>([]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 250,
      flex: 1,
      filterable: false,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 120,
      filterable: false,
      cellClassName: (params: GridCellParams<number>) => {
        const magnetId = params.id;
        const index = originalMagnetData.findIndex(
          (magnet) => magnet.id === magnetId
        );
        if (params.value !== undefined) {
          return clsx('stock', {
            changed: params.value !== originalMagnetData[index].stock,
          });
        } else {
          return '';
        }
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 200,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<number>) => {
        const onClick = (event: any, direction: string) => {
          event.stopPropagation(); // don't select this row after clicking

          const change = direction === 'up' ? 1 : -1;
          const magnetList = [...updatedMagnetStock];

          const magnetId = params.id;
          const updateIndex = updatedMagnetStock.findIndex(
            (magnet) => magnet.id === magnetId
          );
          const magnetToUpdate = updatedMagnetStock[updateIndex];
          const updated = {
            ...magnetToUpdate,
            stock: magnetToUpdate.stock + change,
          };

          magnetList.splice(updateIndex, 1, updated);

          setUpdatedMagnetStock(magnetList);
        };

        return (
          <>
            <IconButton onClick={(e) => onClick(e, 'up')} aria-label="add">
              <AddIcon />
            </IconButton>
            <IconButton onClick={(e) => onClick(e, 'down')} aria-label="remove">
              <RemoveIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const gridRows = updatedMagnetStock.map((magnet) => {
      return {
        id: magnet.id,
        name: magnet.name,
        stock: magnet.stock,
      };
    });

    setRows(gridRows);
  }, [updatedMagnetStock]);

  function submitChangesToMagnets() {
    uploadMagnetData(updatedMagnetStock);
    setOriginalMagnetData(updatedMagnetStock);
  }

  function render() {
    return (
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
        }}
        disableVirtualization={true}
        disableSelectionOnClick={true}
      />
    );
  }

  return (
    <>
      <PageLayout pageTitle="Stock Management" child={render()} />
      <Tooltip title="Submit">
        <Fab
          size="medium"
          color="secondary"
          aria-label="submit"
          sx={{ position: 'fixed', top: 90, right: 40 }}
          onClick={submitChangesToMagnets}
        >
          <DoneIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
