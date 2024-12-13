```typescript
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Tooltip,
  CircularProgress,
  Fade 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const InputWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    }
  }
}));

interface IdeaInputProps {
  onSubmit: (input: string) => Promise<void>;
  onSuggestion?: () => void;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onSubmit, onSuggestion }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      await onSubmit(input);
      setInput('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InputWrapper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <StyledTextField
          fullWidth
          multiline
          minRows={1}
          maxRows={5}
          placeholder="Describe your app idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          InputProps={{
            startAdornment: (
              <AutoAwesomeIcon 
                color="primary" 
                sx={{ mr: 1, opacity: 0.7 }} 
              />
            )
          }}
        />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {onSuggestion && (
            <Tooltip title="Get Suggestion">
              <IconButton 
                size="small"
                onClick={onSuggestion}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  }
                }}
              >
                <TipsAndUpdatesIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          <Tooltip title="Generate Ideas">
            <IconButton
              color="primary"
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              sx={{ 
                backgroundColor: 'primary.light',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SendIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </InputWrapper>
  );
};

export default IdeaInput;
```
