import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddIcon from '@mui/icons-material/Add';
import { Message } from './types';

interface SuggestionPanelProps {
  suggestions: Message[];
  onAddSuggestion: (suggestion: Message) => void;
}

const SuggestionPanel: React.FC<SuggestionPanelProps> = ({
  suggestions,
  onAddSuggestion
}) => {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Suggestions
      </Typography>
      <List>
        {suggestions.map((suggestion) => (
          <ListItem
            key={suggestion.id}
            secondaryAction={
              <IconButton 
                edge="end" 
                onClick={() => onAddSuggestion(suggestion)}
              >
                <AddIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <LightbulbIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={suggestion.content}
              secondary={
                suggestion.metadata?.tags?.join(', ') || 
                suggestion.metadata?.category
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SuggestionPanel;
