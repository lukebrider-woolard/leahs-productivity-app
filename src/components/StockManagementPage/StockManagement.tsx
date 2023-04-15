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
import { readMagnetData, uploadMagnetData } from '../../utils/localDataUtils';
import { MagnetData } from '../../types';

const magnetData = readMagnetData();

export default function StockManagementPage() {
  function render() {
    return <></>;
  }

  return (
    <>
      <PageLayout pageTitle="Stock Management" child={render()} />
    </>
  );
}
