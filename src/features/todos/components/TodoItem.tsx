import React, { useState, useEffect, useRef } from 'react';
import { CardContent, TextField, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Todo } from '@shared/types';
import { format, isValid, parseISO } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import Box from '@shared/components/Box';
import Card from '@shared/components/Card';
import Typography from '@shared/components/Typography';
import { motion } from 'framer-motion';
import Checkbox from '@shared/components/Checkbox';
import IconButton from '@shared/components/IconButton';
import { SxProps, Theme } from '@mui/material/styles';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => Promise<void>;
    onEdit: (id: number, title: string) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    selected: boolean;
    onSelect: () => void;
    disableDelete: boolean;
    isAnyTodoBeingEdited: boolean;
    onStartEditing: () => void;
    onStopEditing: () => void;
    sx?: SxProps<Theme>;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
    todo, 
    onDelete, 
    onEdit, 
    selected, 
    onSelect, 
    disableDelete, 
    isAnyTodoBeingEdited,
    onStartEditing,
    onStopEditing,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleEdit = () => {
        if (isEditing) {
            onEdit(todo.id, editedTitle);
            onStopEditing();
        } else {
            onStartEditing();
        }
        setIsEditing(!isEditing);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEdit();
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        inputRef.current?.focus();
    };

    const safeFormatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        const date = parseISO(dateString);
        if (!isValid(date)) return 'Invalid Date';
        
        const formattedDate = format(date, "MMMM do, yyyy 'at' h:mm a");
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            layout
        >
            <Card
                sx={{
                    mt: 2,
                    mb: 2,
                    borderLeft: '4px solid',
                    borderColor: '#008cff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : undefined,
                    boxShadow: theme.shadows[1],
                }}
            >
                <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    alignItems: isMobile ? 'flex-start' : 'center',
                    '&:last-child': { pb: 1 },
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : undefined,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
                        <Checkbox
                            checked={selected}
                            onChange={onSelect}
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
                                        color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : undefined,
                                    },
                                }}
                            />
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    opacity: todo.completed ? 0.7 : 1,
                                    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : undefined,
                                }}
                            >
                                {todo.title}
                            </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                            Created: {todo.createdAt ? safeFormatDate(todo.createdAt) : 'N/A'}
                        </Typography>
                        {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
                            <Typography variant="caption" sx={{ display: 'block' }} color="text.secondary">
                                Updated: {safeFormatDate(todo.updatedAt)}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', mt: isMobile ? 2 : 0 }}>
                        <IconButton 
                            onClick={handleEdit} 
                            size={isMobile ? "small" : "medium"}
                            disabled={isAnyTodoBeingEdited && !isEditing}
                            sx={{
                                color: isEditing ? '#4caf50' : '#ffa500',
                                '&:hover': {
                                    backgroundColor: (isAnyTodoBeingEdited && !isEditing) ? 'transparent' : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'),
                                },
                                '& .MuiSvgIcon-root': {
                                    color: (isAnyTodoBeingEdited && !isEditing) ? theme.palette.action.disabled : (isEditing ? '#4caf50' : '#ffa500'),
                                },
                            }}
                        >
                            {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>
                        <IconButton 
                            onClick={() => onDelete(todo.id)} 
                            size={isMobile ? "small" : "medium"}
                            disabled={disableDelete}
                            sx={{
                                color: disableDelete ? theme.palette.action.disabled : '#ff0000',
                                '&:hover': {
                                    backgroundColor: disableDelete ? 'transparent' : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'),
                                },
                                '& .MuiSvgIcon-root': {
                                    color: disableDelete ? theme.palette.action.disabled : '#ff0000',
                                },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TodoItem;