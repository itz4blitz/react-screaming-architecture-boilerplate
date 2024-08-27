import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiCheckbox
      {...props}
      sx={{
        ...props.sx,
        '&.Mui-checked, &.MuiCheckbox-indeterminate': {
          color: theme.palette.mode === 'dark' ? '#008cff' : undefined,
        },
      }}
    />
  );
};

export default Checkbox;