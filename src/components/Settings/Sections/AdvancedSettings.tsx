```typescript
import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material';

interface AdvancedSettingsProps {
  onChange: () => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Advanced Settings
      </Typography>

      <FormControlLabel
        control={<Switch onChange={onChange} />}
        label="Enable Debug Mode"
      />

      <FormControlLabel
        control={<Switch onChange={onChange} />}
        label="Enable Performance Tracking"
      />

      <FormControlLabel
        control={<Switch onChange={onChange} />}
        label="Enable Local Storage"
      />
    </Box>
  );
};

export default AdvancedSettings;
```
