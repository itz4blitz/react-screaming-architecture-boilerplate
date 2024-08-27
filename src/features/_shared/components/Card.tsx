import React from 'react';
import { Card as MuiCard, CardProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Card: React.FC<CardProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiCard
      {...props}
      sx={{
        ...props.sx,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        '&&': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.background.paper,
        },
      }}
    />
  );
};

export default Card;
