import { useContext } from 'react';
import { TodoContext, TodoContextType } from './TodoContext';

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  // Keep all existing functionality
  const {
    todos,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
    // Add the new addTodo function
    addTodo,
    // Include any other existing functions or properties
  } = context;

  return {
    todos,
    toggleTodo,
    deleteTodo,
    editTodo,
    reorderTodos,
    addTodo,
    // Return any other existing functions or properties
  };
};
