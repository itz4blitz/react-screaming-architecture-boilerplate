import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, useMediaQuery, IconButton, Menu, MenuItem, Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';
import FlashOnIcon from '@mui/icons-material/FlashOn';

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <a href="https://github.com/itz4blitz/screaming-architecture-boilerplate/fork" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary }}>
                  <GitHubIcon style={{ marginRight: '8px' }} />
                  <Typography variant="body1">Fork Repo</Typography>
                </a>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <a href="https://github.com/itz4blitz/screaming-architecture-boilerplate/issues/new" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary }}>
                  <BugReportIcon style={{ marginRight: '8px' }} />
                  <Typography variant="body1">Report a Bug</Typography>
                </a>
              </MenuItem>
            </Menu>
          </>
        ) : null}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <FlashOnIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6">Todo App</Typography>
        </Box>
        {!isMobile && (
          <>
            <Link href="https://github.com/itz4blitz/screaming-architecture-boilerplate/fork" target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', color: 'inherit', marginRight: 2 }}>
              <GitHubIcon style={{ marginRight: '8px' }} />
              <Typography variant="body1">Fork Repo</Typography>
            </Link>
            <Link href="https://github.com/itz4blitz/screaming-architecture-boilerplate/issues/new" target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
              <BugReportIcon style={{ marginRight: '8px' }} />
              <Typography variant="body1">Report a Bug</Typography>
            </Link>
          </>
        )}
        <Switch
          checked={theme.palette.mode === 'dark'}
          onChange={toggleDarkMode}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;