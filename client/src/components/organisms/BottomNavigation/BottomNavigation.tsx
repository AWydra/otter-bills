import * as React from 'react';
import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Paper } from '@mui/material';

const BottomNavigation = (): React.ReactElement => {
  const [value, setValue] = React.useState(0);

  return (
    <Paper elevation={3} sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Page 1" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Page 2" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Page 3" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Page 4" icon={<FavoriteIcon />} />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
