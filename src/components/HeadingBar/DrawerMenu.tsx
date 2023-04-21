// React
import { useNavigate } from 'react-router-dom';

// Material UI
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
import HistoryIcon from '@mui/icons-material/History';

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
        <ListItem key="MagnetData" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/magnet-data')}>
            <ListItemIcon>
              <DatasetOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Magnets Data" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Sales" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/sales')}>
            <ListItemIcon>
              <PointOfSaleIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItemButton>
        </ListItem>
        <ListItem key="StockManagement" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/stock-management')}>
            <ListItemIcon>
              <InventoryIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Stock Management" />
          </ListItemButton>
        </ListItem>
        <ListItem key="PreviousOrders" disablePadding>
          <ListItemButton onClick={() => navigateToPage('/previous-orders')}>
            <ListItemIcon>
              <HistoryIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Previous Orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
