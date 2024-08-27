import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Input: React.FC<TextFieldProps> = (props) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: theme.shape.borderRadius,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.grey[100],
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[700]
                : theme.palette.grey[200],
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default Input;
