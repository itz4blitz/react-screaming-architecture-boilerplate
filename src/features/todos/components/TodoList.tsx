import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Box from '@shared/components/Box';
import Typography from '@shared/components/Typography';
import Button from '@shared/components/Button';
import TodoItem from './TodoItem';
import { useTodos } from '@features/todos/hooks/useTodos';
import { Todo } from '@shared/types';

const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo, editTodo, reorderTodos } = useTodos();
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSelectAll = () => {
    if (selectedTodos.length === todos.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(todos.map((todo) => todo.id));
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedTodos) {
      await deleteTodo(id);
    }
    setSelectedTodos([]);
  };

  const handleSelectTodo = (id: number) => {
    setSelectedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  const handleStartEditing = (id: number) => {
    setEditingTodoId(id);
  };

  const handleStopEditing = () => {
    setEditingTodoId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTodo(todos.find((todo) => todo.id === active.id) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over?.id);

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      reorderTodos(newTodos.map((todo) => todo.id));
    }

    setActiveTodo(null);
  };

  return (
    <Box
      sx={{
        mt: 4,
        px: 2,
        maxWidth: 600,
        mx: 'auto',
        borderRadius: 2,
        p: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={
          {
            /* ... styles ... */
          }
        }
      >
        Todo List
      </Typography>
      {todos.length === 0 ? (
        <Typography
          variant="body1"
          sx={
            {
              /* ... styles ... */
            }
          }
        >
          No todos yet. Add a new todo to get started!
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button onClick={handleSelectAll}>
              {selectedTodos.length === todos.length
                ? 'Deselect All'
                : 'Select All'}
            </Button>
            {selectedTodos.length > 1 && (
              <Button onClick={handleDeleteSelected} color="error">
                Delete Selected
              </Button>
            )}
          </Box>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={todos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ listStyleType: 'none', padding: 0 }}>
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                    onSelect={() => handleSelectTodo(todo.id)}
                    selected={selectedTodos.includes(todo.id)}
                    disableDelete={selectedTodos.length > 1}
                    isAnyTodoBeingEdited={editingTodoId !== null}
                    onStartEditing={() => handleStartEditing(todo.id)}
                    onStopEditing={handleStopEditing}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeTodo ? (
                <div
                  style={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    pointerEvents: 'none', // Prevent interaction with the overlay
                    opacity: 0.8, // Make it slightly transparent
                  }}
                >
                  <TodoItem
                    todo={activeTodo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                    onSelect={() => {}}
                    selected={selectedTodos.includes(activeTodo.id)}
                    disableDelete={selectedTodos.length > 1}
                    isAnyTodoBeingEdited={editingTodoId !== null}
                    onStartEditing={() => {}}
                    onStopEditing={() => {}}
                    isMobile={isMobile}
                    isDragging
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </>
      )}
    </Box>
  );
};

export default TodoList;
