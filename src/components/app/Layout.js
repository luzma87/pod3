import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navbar/NavBar';

function Layout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}

Layout.propTypes = {};

export default Layout;
