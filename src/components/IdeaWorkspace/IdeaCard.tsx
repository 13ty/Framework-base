import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Idea } from './types';

interface IdeaCardProps {
  idea: Idea;
  onUpdate: (updates: Partial<Idea>) => void;
  onDelete: () => void;
  onEdit: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  onUpdate,
  onDelete,
  onEdit
}) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {idea.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          paragraph
        >
          {idea.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label={idea.category}
            size="small"
            color="primary"
          />
          <Chip 
            label={idea.status}
            size="small"
            color={
              idea.status === 'completed' 
                ? 'success' 
                : idea.status === 'active' 
                  ? 'primary' 
                  : 'default'
            }
          />
          {idea.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default IdeaCard;
