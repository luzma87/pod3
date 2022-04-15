import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import InvertColorsOffTwoToneIcon from '@mui/icons-material/InvertColorsOffTwoTone';
import InvertColorsTwoToneIcon from '@mui/icons-material/InvertColorsTwoTone';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

function NavBar() {
  const { t } = useTranslation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('appName')}
        </Typography>

        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="secondary"
        >
          <InfoTwoToneIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <InvertColorsOffTwoToneIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <InvertColorsTwoToneIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {};

export default NavBar;
