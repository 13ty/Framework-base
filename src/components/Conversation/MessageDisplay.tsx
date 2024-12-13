import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CodeIcon from '@mui/icons-material/Code';
import { Message } from './types';

interface MessageDisplayProps {
  message: Message;
  onSave?: (message: Message) => void;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  onSave
}) => {
  const isAssistant = message.role === 'assistant';

  const getIcon = () => {
    switch (message.type) {
      case 'idea':
        return <LightbulbIcon />;
      case 'code':
        return <CodeIcon />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isAssistant ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: '80%',
          p: 2,
          bgcolor: isAssistant ? 'background.paper' : 'primary.light',
          color: isAssistant ? 'text.primary' : 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          {getIcon()}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              {message.content}
            </Typography>
            
            {message.metadata && (
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {message.metadata.category && (
                  <Chip
                    label={message.metadata.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {message.metadata.confidence && (
                  <Tooltip title="Confidence Score">
                    <Chip
                      label={`${Math.round(message.metadata.confidence * 100)}%`}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </Tooltip>
                )}
                {message.metadata.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>
          
          {isAssistant && onSave && (
            <IconButton 
              size="small" 
              onClick={() => onSave(message)}
              sx={{ ml: 1 }}
            >
              <SaveIcon />
            </IconButton>
          )}
        </Box>
        
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            mt: 1,
            color: isAssistant ? 'text.secondary' : 'rgba(255,255,255,0.7)'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageDisplay;
