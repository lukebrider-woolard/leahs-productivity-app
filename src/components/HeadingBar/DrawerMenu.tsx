import { useNavigate } from 'react-router-dom';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function DrawerMenu(props: Props) {
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      props.setOpen(open);
    };

  function navigateToPage(address: string) {
    props.setOpen(false);
    navigate(address);
  }

  return (
    <Drawer open={props.isOpen} onClose={toggleDrawer(false)}>
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/')}>
            <ListItemIcon>
              <HomeOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="DataPage" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/data-page')}>
            <ListItemIcon>
              <DatasetOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Magnets Data Display" />
          </ListItemButton>
        </ListItem>
        <ListItem key="SalesPage" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/sales-page')}>
            <ListItemIcon>
              <PointOfSaleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Sales Page" />
          </ListItemButton>
        </ListItem>
        <ListItem key="StockManagement" disablePadding>
          <ListItemButton
            onClick={() => navigateToPage('/stock-management-page')}
          >
            <ListItemIcon>
              <InventoryIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Stock Management Page" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
