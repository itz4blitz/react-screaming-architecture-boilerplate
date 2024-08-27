import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const IconButton: React.FC<IconButtonProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiIconButton
      {...props}
      sx={{
        ...props.sx,
        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
      }}
    />
  );
};

export default IconButton;