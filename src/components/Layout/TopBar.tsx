```typescript
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { ModelConfig } from '../../types';

interface TopBarProps {
  modelConfig: ModelConfig;
  onSettingsClick: () => void;
  onMenuClick: () => void;
  isMobile: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  modelConfig,
  onSettingsClick,
  onMenuClick,
  isMobile
}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={onMenuClick}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI App Idea Generator
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Settings">
            <IconButton 
              color="inherit"
              onClick={onSettingsClick}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
```
