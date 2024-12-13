```typescript
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Dialog,
  TextField,
  Collapse,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pipeline, PipelineStep, PipelineConfig } from '../../types/pipeline';
import PipelineService from '../../services/PipelineService';

interface PipelineManagerProps {
  pipelines: PipelineConfig[];
  onPipelinesChange: (pipelines: PipelineConfig[]) => void;
}

const PipelineManager: React.FC<PipelineManagerProps> = ({
  pipelines,
  onPipelinesChange
}) => {
  const [showNewPipelineDialog, setShowNewPipelineDialog] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState('');
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineConfig | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionError, setExecutionError] = useState<string | null>(null);

  const handleCreatePipeline = () => {
    const newPipeline: PipelineConfig = {
      id: Date.now().toString(),
      name: newPipelineName,
      description: '',
      steps: []
    };
    onPipelinesChange([...pipelines, newPipeline]);
    setNewPipelineName('');
    setShowNewPipelineDialog(false);
  };

  const handleEditPipeline = (pipeline: PipelineConfig) => {
    setSelectedPipeline(pipeline);
  };

  const handleDeletePipeline = (pipelineId: string) => {
    onPipelinesChange(pipelines.filter(p => p.id !== pipelineId));
  };

  const handleExecutePipeline = async (pipelineId: string) => {
    setIsExecuting(true);
    setExecutionError(null);
    try {
      const pipeline = pipelines.find(p => p.id === pipelineId);
      if (!pipeline) throw new Error('Pipeline not found');

      const pipelineService = new PipelineService();
      await pipelineService.runPipeline(pipeline);
    } catch (error: any) {
      setExecutionError(error.message);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5">
          Pipelines
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowNewPipelineDialog(true)}
        >
          New Pipeline
        </Button>
      </Box>

      <List>
        {pipelines.map((pipeline) => (
          <ListItem
            key={pipeline.id}
            secondaryAction={
              <Box>
                <IconButton 
                  size="small"
                  onClick={() => handleExecutePipeline(pipeline.id)}
                  disabled={isExecuting}
                >
                  <PlayArrowIcon />
                </IconButton>
                <IconButton 
                  size="small"
                  onClick={() => handleEditPipeline(pipeline)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => handleDeletePipeline(pipeline.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={pipeline.name}
              secondary={pipeline.description}
            />
          </ListItem>
        ))}
      </List>

      {/* New Pipeline Dialog */}
      <Dialog
        open={showNewPipelineDialog}
        onClose={() => setShowNewPipelineDialog(false)}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create New Pipeline
          </Typography>
          <TextField
            fullWidth
            label="Pipeline Name"
            value={newPipelineName}
            onChange={(e) => setNewPipelineName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setShowNewPipelineDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleCreatePipeline}
              disabled={!newPipelineName.trim()}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Pipeline Editor */}
      {selectedPipeline && (
        <PipelineEditor
          pipeline={selectedPipeline}
          onUpdate={(updatedPipeline) => {
            onPipelinesChange(
              pipelines.map(p => p.id === updatedPipeline.id ? updatedPipeline : p)
            );
            setSelectedPipeline(null);
          }}
          onClose={() => setSelectedPipeline(null)}
        />
      )}

      {/* Execution Error Alert */}
      {executionError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {executionError}
        </Alert>
      )}
    </Box>
  );
};

export default PipelineManager;
```
