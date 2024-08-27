import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import TodoList from '@features/todos/components/TodoList';
import CreateTodoForm from '@features/todos/components/CreateTodoForm';
import Header from '@shared/components/Header';
import Footer from '@shared/components/Footer';
import { TodoProvider } from '@features/todos/hooks/TodoContext';
import { getAppTheme } from '@features/_shared/theme';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = useMemo(
    () => getAppTheme(darkMode ? 'dark' : 'light'),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Header
          toggleDarkMode={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />
        <CreateTodoForm />
        <TodoList />
        <Footer />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
