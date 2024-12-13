```typescript
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

interface IntegrationSettingsProps {
  onChange: () => void;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({ onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Integration Settings
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Design Tool</InputLabel>
        <Select
          value="figma"
          label="Design Tool"
          onChange={onChange}
        >
          <MenuItem value="figma">Figma</MenuItem>
          <MenuItem value="adobe-xd">Adobe XD</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="API Key"
        type="password"
        margin="normal"
        onChange={onChange}
      />

      <TextField
        fullWidth
        label="Webhook URL"
        margin="normal"
        onChange={onChange}
      />
    </Box>
  );
};

export default IntegrationSettings;
```
