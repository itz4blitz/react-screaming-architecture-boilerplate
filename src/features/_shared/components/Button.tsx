import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiButton
      {...props}
      sx={{
        borderRadius: theme.shape.borderRadius,
        textTransform: 'none',
        ...props.sx,
      }}
    />
  );
};

export default Button;