import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, darkMode }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: darkMode ? theme.palette.grey[800] : theme.palette.primary.main,
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;