import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TodoList, CreateTodoForm } from '@features/todos';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <StyledBox>
        <Typography variant="h4" gutterBottom>
          Todo App
        </Typography>
        <CreateTodoForm />
        <TodoList />
      </StyledBox>
    </Container>
  );
};

export default Home;