```typescript
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Pipeline, PipelineStep, PipelineConfig } from '../../types/pipeline';

interface PipelineEditorProps {
  pipeline: PipelineConfig;
  onUpdate: (pipeline: PipelineConfig) => void;
  onClose: () => void;
}

const PipelineEditor: React.FC<PipelineEditorProps> = ({
  pipeline,
  onUpdate,
  onClose
}) => {
  const [editedPipeline, setEditedPipeline] = useState<PipelineConfig>(pipeline);
  const [showAddStepDialog, setShowAddStepDialog] = useState(false);
  const [newStep, setNewStep] = useState<PipelineStep>({
    type: 'prompt',
    name: '',
    config: {}
  });

  const handleUpdatePipeline = (updatedPipeline: PipelineConfig) => {
    setEditedPipeline(updatedPipeline);
  };

  const handleAddStep = () => {
    handleUpdatePipeline({
      ...editedPipeline,
      steps: [...editedPipeline.steps, newStep]
    });
    setNewStep({ type: 'prompt', name: '', config: {} });
    setShowAddStepDialog(false);
  };

  const handleDeleteStep = (stepIndex: number) => {
    handleUpdatePipeline({
      ...editedPipeline,
      steps: editedPipeline.steps.filter((_, index) => index !== stepIndex)
    });
  };

  const handleSave = () => {
    onUpdate(editedPipeline);
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Edit Pipeline: {pipeline.name}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Pipeline Name"
          value={editedPipeline.name}
          onChange={(e) => handleUpdatePipeline({
            ...editedPipeline,
            name: e.target.value
          })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={editedPipeline.description}
          onChange={(e) => handleUpdatePipeline({
            ...editedPipeline,
            description: e.target.value
          })}
          sx={{ mb: 2 }}
        />

        <Typography variant="h6" gutterBottom>
          Steps
        </Typography>
        <List>
          {editedPipeline.steps.map((step, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => handleDeleteStep(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <DragIndicatorIcon sx={{ mr: 1, cursor: 'grab' }} />
              <ListItemText
                primary={step.name}
                secondary={step.type}
              />
            </ListItem>
          ))}
        </List>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setShowAddStepDialog(true)}
        >
          Add Step
        </Button>

        {/* Add Step Dialog */}
        <Dialog
          open={showAddStepDialog}
          onClose={() => setShowAddStepDialog(false)}
        >
          <DialogTitle>Add New Step</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Step Type</InputLabel>
              <Select
                value={newStep.type}
                label="Step Type"
                onChange={(e) => setNewStep({
                  ...newStep,
                  type: e.target.value as PipelineStep['type']
                })}
              >
                <MenuItem value="prompt">Prompt</MenuItem>
                <MenuItem value="llm">LLM</MenuItem>
                <MenuItem value="data">Data</MenuItem>
                <MenuItem value="external">External</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Step Name"
              value={newStep.name}
              onChange={(e) => setNewStep({
                ...newStep,
                name: e.target.value
              })}
              sx={{ mb: 2 }}
            />

            {/* Add configuration options based on step type */}
            {newStep.type === 'prompt' && (
              <TextField
                fullWidth
                label="Prompt Template"
                value={newStep.config.template || ''}
                onChange={(e) => setNewStep({
                  ...newStep,
                  config: {
                    ...newStep.config,
                    template: e.target.value
                  }
                })}
                sx={{ mb: 2 }}
              />
            )}

            {/* Add more configuration options for other step types */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddStepDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleAddStep}
              disabled={!newStep.name}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="contained"
          onClick={handleSave}
        >
          Save Pipeline
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PipelineEditor;
```
