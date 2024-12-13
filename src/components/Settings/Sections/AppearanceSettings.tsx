```typescript
import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material';

interface AppearanceSettingsProps {
  onChange: () => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Appearance Settings
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Theme</InputLabel>
        <Select
          value="light"
          label="Theme"
          onChange={onChange}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </FormControl>

      <Typography gutterBottom sx={{ mt: 2 }}>
        Transparency
      </Typography>
      <Slider
        defaultValue={0.8}
        step={0.1}
        min={0.1}
        max={1}
        valueLabelDisplay="auto"
        onChange={onChange}
      />

      <TextField
        fullWidth
        label="Primary Color"
        type="color"
        margin="normal"
        onChange={onChange}
      />

      <TextField
        fullWidth
        label="Secondary Color"
        type="color"
        margin="normal"
        onChange={onChange}
      />

      <FormControlLabel
        control={<Switch onChange={onChange} />}
        label="Enable Animations"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default AppearanceSettings;
```
