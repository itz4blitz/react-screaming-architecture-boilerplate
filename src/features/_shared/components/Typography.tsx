import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Typography: React.FC<TypographyProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiTypography
      {...props}
      sx={{
        ...props.sx,
        color: props.color || theme.palette.text.primary,
      }}
    />
  );
};

export default Typography;
