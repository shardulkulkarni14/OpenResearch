import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RedditIcon from '@mui/icons-material/Reddit';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <RedditIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reddit AI Tracker
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 