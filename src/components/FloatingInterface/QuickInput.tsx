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
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const InputWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
}));

interface QuickInputProps {
  onSubmit: (input: string) => Promise<void>;
  onOpenSettings?: () => void;
}

const QuickInput: React.FC<QuickInputProps> = ({ onSubmit, onOpenSettings }) => {
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
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Describe your idea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        size="small"
        InputProps={{
          startAdornment: (
            <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
          )
        }}
      />
      
      <Tooltip title="Settings">
        <IconButton 
          size="small"
          onClick={onOpenSettings}
          sx={{ alignSelf: 'center' }}
        >
          <TuneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Generate Ideas">
        <IconButton
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{ alignSelf: 'center' }}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Tooltip>
    </InputWrapper>
  );
};

export default QuickInput;
```
