import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import { ModelConfig, PerformanceMetrics } from '../types';
import SettingsDialog from './SettingsDialog';

interface TopBarProps {
  metrics: PerformanceMetrics | null;
  modelConfig: ModelConfig;
  onModelConfigChange: (config: ModelConfig) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  metrics,
  modelConfig,
  onModelConfigChange
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI App Idea Generator
        </Typography>

        {metrics && (
          <Box sx={{ display: 'flex', gap: 2, mr: 3 }}>
            <Chip
              icon={<SpeedIcon />}
              label={`${metrics.wordsPerMinute} WPM`}
              color="secondary"
            />
            <Chip
              label={`Words: ${metrics.wordCount}`}
              variant="outlined"
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`Model: ${modelConfig.modelName}`}
            color="primary"
            variant="outlined"
          />
          <IconButton 
            color="inherit"
            onClick={() => setSettingsOpen(true)}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        modelConfig={modelConfig}
        onConfigChange={onModelConfigChange}
      />
    </AppBar>
  );
};

export default TopBar;
