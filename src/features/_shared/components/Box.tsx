import React from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

const Box: React.FC<BoxProps> = (props) => {
  return <MuiBox {...props} />;
};

export default Box;