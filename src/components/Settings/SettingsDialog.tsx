import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import ModelSettings from './Sections/ModelSettings';
import PromptSettings from './Sections/PromptSettings';
import AppearanceSettings from './Sections/AppearanceSettings';
import IntegrationSettings from './Sections/IntegrationSettings';
import AdvancedSettings from './Sections/AdvancedSettings';
import { ModelConfig } from '../../types';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSettingsChange: (config: ModelConfig) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  onSettingsChange
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <ModelSettings onChange={onSettingsChange} />
        <PromptSettings onChange={() => {}} />
        <AppearanceSettings onChange={() => {}} />
        <IntegrationSettings onChange={() => {}} />
        <AdvancedSettings onChange={() => {}} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
```
