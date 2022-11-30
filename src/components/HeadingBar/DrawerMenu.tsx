import { useNavigate } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function DrawerMenu(props: Props) {
  const navigate = useNavigate();

  const toggleDrawer =
  (open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    props.setOpen(open);
  };

  return (
    <Drawer open={props.isOpen} onClose={toggleDrawer(false)}>
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeOutlinedIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="DataPage" disablePadding>
          <ListItemButton onClick={() => navigate('/datapage')}>
            <ListItemIcon>
              <DatasetOutlinedIcon color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Magnets Data Display" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
