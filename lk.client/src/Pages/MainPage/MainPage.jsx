import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Box } from '@mui/material';
import { orange } from '@mui/material/colors';


function MainPage () {
  return (
    <AppBar position="static" sx={{height: 50, backgroundColor: "#F47920", border: "none"}}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MainPage