import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '@shared/types';
import { getTodos, addTodo, updateTodo, deleteTodo } from '@features/todos/services/todoService';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  editTodo: (id: number, title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  };

  const addTodoItem = async (title: string) => {
    const newTodo = await addTodo(title);
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (todoToToggle) {
      const updatedTodo = await updateTodo({ ...todoToToggle, completed: !todoToToggle.completed });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    }
  };

  const editTodoItem = async (id: number, title: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      const updatedTodo = await updateTodo({
        ...todoToEdit,
        title,
        updatedAt: new Date().toISOString()
      });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    }
  };

  const deleteTodoItem = async (id: number) => {
    await deleteTodo(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo: addTodoItem, toggleTodo, editTodo: editTodoItem, deleteTodo: deleteTodoItem }}>
      {children}
    </TodoContext.Provider>
  );
};