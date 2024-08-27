import React from 'react';
import { Box, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <IconButton
        color="inherit"
        href="https://github.com/yourusername/your-repo-name"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;