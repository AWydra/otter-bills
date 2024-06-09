import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" fontWeight={700} component="div">
            OtterBills
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
