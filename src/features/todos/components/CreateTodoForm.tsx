import React, { useState, useEffect, useRef } from 'react';
import { TextField, Grid, Container } from '@mui/material';
import { useTodos } from '@features/todos/hooks/useTodos';
import Button from '@shared/components/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@/features/_shared/components/Box';

const CreateTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };

    focusInput();

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        event.preventDefault();
        focusInput();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs>
              <TextField
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Begin typing a todo and press enter or click ADD"
                size="medium"
                inputRef={inputRef}
                autoComplete="off"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: theme.shape.borderRadius / 2,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.dark,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.dark,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: theme.shape.borderRadius / 2,
                  textTransform: 'uppercase',
                  height: '100%',
                  backgroundColor: theme.palette.primary.dark,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateTodoForm;