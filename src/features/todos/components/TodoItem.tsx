import React, { useState, useEffect, useRef } from 'react';
import { CardContent, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Todo } from '@shared/types';
import { format, isValid, parseISO } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import Box from '@shared/components/Box';
import Card from '@shared/components/Card';
import Typography from '@shared/components/Typography';
import Checkbox from '@shared/components/Checkbox';
import IconButton from '@shared/components/IconButton';
import { SxProps, Theme } from '@mui/material/styles';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onEdit: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onSelect: () => void;
  selected: boolean;
  disableDelete: boolean;
  isAnyTodoBeingEdited: boolean;
  onStartEditing: () => void;
  onStopEditing: () => void;
  isMobile: boolean;
  sx?: SxProps<Theme>;
  isDragging?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onEdit,
  onSelect,
  selected,
  disableDelete,
  isAnyTodoBeingEdited,
  onStartEditing,
  onStopEditing,
  isMobile,
  isDragging = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editedTitle);
      setIsEditing(false);
      onStopEditing();
    } else {
      setIsEditing(true);
      onStartEditing();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEdit();
    }
  };

  const handleBlur = () => {
    // Remove the preventDefault and focus logic
    handleEdit();
  };

  const safeFormatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid Date';

    const formattedDate = format(date, "MMMM do, yyyy 'at' h:mm a");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    listStyleType: 'none', // Remove list item bullet
    padding: 0,
    margin: '8px 0', // Add some vertical spacing between items
  };

  return (
    <div ref={setNodeRef} style={style} {...(isEditing ? {} : { ...attributes, ...listeners })}>
      <Card
        sx={{
          mt: 2,
          mb: 2,
          borderLeft: '4px solid',
          borderColor: '#008cff',
          borderRadius: '8px',
          overflow: 'hidden',
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          backgroundColor: selected
            ? theme.palette.action.selected
            : theme.palette.mode === 'dark'
              ? theme.palette.grey[700]
              : undefined,
          boxShadow: isDragging ? theme.shadows[8] : theme.shadows[1],
          cursor: 'grab',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.grey[200],
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          onSelect();
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            '&:last-child': { pb: 1 },
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : undefined,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <Checkbox
              checked={selected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
          <Box sx={{ flexGrow: 1, ml: isMobile ? 0 : 2, mt: isMobile ? 2 : 0 }}>
            {isEditing ? (
              <TextField
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                fullWidth
                autoFocus
                variant="outlined"
                inputRef={inputRef}
                InputProps={{
                  style: {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[100]
                        : undefined,
                  },
                }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.7 : 1,
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[100]
                      : undefined,
                }}
              >
                {todo.title}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Created: {todo.createdAt ? safeFormatDate(todo.createdAt) : 'N/A'}
            </Typography>
            {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
              <Typography
                variant="caption"
                sx={{ display: 'block' }}
                color="text.secondary"
              >
                Updated: {safeFormatDate(todo.updatedAt)}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', mt: isMobile ? 2 : 0 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              size={isMobile ? 'small' : 'medium'}
              disabled={isAnyTodoBeingEdited && !isEditing}
              sx={{
                color: isEditing ? '#4caf50' : '#ffa500',
                '&:hover': {
                  backgroundColor:
                    isAnyTodoBeingEdited && !isEditing
                      ? 'transparent'
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                },
                '& .MuiSvgIcon-root': {
                  color:
                    isAnyTodoBeingEdited && !isEditing
                      ? theme.palette.action.disabled
                      : isEditing
                        ? '#4caf50'
                        : '#ffa500',
                },
              }}
            >
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              size={isMobile ? 'small' : 'medium'}
              disabled={disableDelete}
              sx={{
                color: disableDelete
                  ? theme.palette.action.disabled
                  : '#ff0000',
                '&:hover': {
                  backgroundColor: disableDelete
                    ? 'transparent'
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
                '& .MuiSvgIcon-root': {
                  color: disableDelete
                    ? theme.palette.action.disabled
                    : '#ff0000',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoItem;
