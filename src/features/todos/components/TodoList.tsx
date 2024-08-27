import React, { useState } from 'react';
import { List, Typography, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import TodoItem from '@features/todos/components/TodoItem';
import { useTodos } from '@features/todos/hooks/useTodos';
import { useTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';

const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const theme = useTheme();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTodos(event.target.checked ? todos.map(todo => todo.id) : []);
  };

  const handleDeleteSelected = () => {
    selectedTodos.forEach(id => deleteTodo(id));
    setSelectedTodos([]);
  };

  const handleSelectTodo = (id: number) => {
    const newSelectedTodos = selectedTodos.includes(id)
      ? selectedTodos.filter(todoId => todoId !== id)
      : [...selectedTodos, id];
    setSelectedTodos(newSelectedTodos);
  };

  const handleStartEditing = (id: number) => {
    setEditingTodoId(id);
  };

  const handleStopEditing = () => {
    setEditingTodoId(null);
  };

  return (
    <Box sx={{ mt: 4, px: 2, maxWidth: 600, mx: 'auto', borderRadius: 2, p: 3, backgroundColor: theme.palette.background.paper }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: theme.palette.text.primary, 
          textAlign: 'center',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightMedium,
        }}
      >
        Todo List
      </Typography>
      {todos.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', my: 4, color: theme.palette.text.secondary }}>
          No todos yet. Add a new todo to get started!
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTodos.length === todos.length}
                  indeterminate={selectedTodos.length > 0 && selectedTodos.length < todos.length}
                  onChange={handleSelectAll}
                  sx={{
                    '&.Mui-checked, &.MuiCheckbox-indeterminate': {
                      color: theme.palette.mode === 'dark' ? '#008cff' : undefined,
                    },
                  }}
                />
              }
              label="Select All"
            />
            {selectedTodos.length >= 2 && (
              <Button variant="contained" color="error" onClick={handleDeleteSelected} sx={{ borderRadius: '8px' }}>
                Delete Selected
              </Button>
            )}
          </Box>
          <AnimatePresence>
            <List>
              {todos.map((todo) => (
                <motion.div key={todo.id} layout>
                  <TodoItem
                    todo={todo}
                    onToggle={toggleTodo}
                    onEdit={async (id, title) => {
                      await editTodo(id, title);
                      handleStopEditing();
                    }}
                    onDelete={deleteTodo}
                    selected={selectedTodos.includes(todo.id)}
                    onSelect={() => handleSelectTodo(todo.id)}
                    disableDelete={selectedTodos.length > 1}
                    isAnyTodoBeingEdited={editingTodoId !== null}
                    onStartEditing={() => handleStartEditing(todo.id)}
                    onStopEditing={handleStopEditing}
                    sx={{
                      '& .MuiTypography-body1': {
                        fontSize: '1rem',
                      },
                    }}
                  />
                </motion.div>
              ))}
            </List>
          </AnimatePresence>
        </>
      )}
    </Box>
  );
};

export default TodoList;