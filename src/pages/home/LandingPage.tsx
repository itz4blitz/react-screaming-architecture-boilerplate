import React from 'react';
import { Typography, Box, Container, Grid, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { TodoList, CreateTodoForm } from '@features/todos';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledContainer maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Todo App
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledBox>
            <CreateTodoForm />
          </StyledBox>
        </Grid>
        <Grid item xs={12}>
          <StyledBox sx={{ minHeight: '50vh' }}>
            <TodoList />
          </StyledBox>
        </Grid>
      </Grid>
      {!isMobile && (
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Todo App. All rights reserved.
          </Typography>
        </Box>
      )}
    </StyledContainer>
  );
};

export default Home;