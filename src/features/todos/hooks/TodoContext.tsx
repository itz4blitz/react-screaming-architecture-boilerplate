import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '@shared/types';
import {
  getTodos,
  addTodo as addTodoService,
  updateTodo,
  deleteTodo as deleteTodoService,
} from '@features/todos/services/todoService';

export interface TodoContextType {
  todos: Todo[];
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  editTodo: (id: number, title: string) => Promise<void>;
  reorderTodos: (newOrder: number[]) => void;
  addTodo: (title: string) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const addTodo = async (title: string) => {
    const newTodo = await addTodoService(title);
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (todoToToggle) {
      const updatedTodo = await updateTodo({
        ...todoToToggle,
        completed: !todoToToggle.completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const editTodo = async (id: number, title: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      const updatedTodo = await updateTodo({
        ...todoToEdit,
        title,
        updatedAt: new Date().toISOString(),
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const deleteTodo = async (id: number) => {
    await deleteTodoService(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const reorderTodos = (newOrder: number[]) => {
    const reorderedTodos = newOrder.map(
      (id) => todos.find((todo) => todo.id === id)!
    );
    setTodos(reorderedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        toggleTodo,
        deleteTodo,
        editTodo,
        reorderTodos,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
