import { Todo } from '@shared/types';

const STORAGE_KEY = 'todos';

export const getTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    resolve(todos);
  });
};

export const addTodo = async (title: string): Promise<Todo> => {
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  todos.push(newTodo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  return newTodo;
};

export const updateTodo = (updatedTodo: Todo): Promise<Todo> => {
  return new Promise((resolve) => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const index = todos.findIndex((todo: Todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = {
        ...updatedTodo,
        updatedAt: updatedTodo.updatedAt || new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
    resolve(todos[index]);
  });
};

export const deleteTodo = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    resolve();
  });
};

export const updateTodoOrder = (newOrder: number[]): Promise<void> => {
  return new Promise((resolve) => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const reorderedTodos = newOrder.map(id => todos.find((todo: Todo) => todo.id === id)!);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reorderedTodos));
    resolve();
  });
};
