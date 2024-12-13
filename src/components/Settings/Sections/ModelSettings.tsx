```typescript
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Slider
} from '@mui/material';
import { ModelConfig } from '../../../types';
import ModelConfigService from '../../../services/ModelConfigService';

interface ModelSettingsProps {
  onChange: (config: ModelConfig) => void;
}

const ModelSettings: React.FC<ModelSettingsProps> = ({ onChange }) => {
  const [modelType, setModelType] = useState<'ollama' | 'external'>('ollama');
  const [ollamaConfig, setOllamaConfig] = useState({
    endpoint: 'http://localhost:11434',
    availableModels: [] as string[],
    selectedModel: '',
    isLoading: false,
    error: ''
  });

  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0
  });

  useEffect(() => {
    if (modelType === 'ollama') {
      fetchOllamaModels();
    }
  }, [modelType, ollamaConfig.endpoint]);

  const fetchOllamaModels = async () => {
    setOllamaConfig(prev => ({ ...prev, isLoading: true, error: '' }));
    try {
      const service = ModelConfigService.getInstance();
      const models = await service.getOllamaModels();
      setOllamaConfig(prev => ({
        ...prev,
        availableModels: models.map(m => m.name),
        isLoading: false
      }));
    } catch (err) {
      setOllamaConfig(prev => ({
        ...prev,
        error: 'Failed to fetch models',
        isLoading: false
      }));
    }
  };

  const handleSettingsChange = (updates: Partial<ModelConfig>) => {
    const newConfig = {
      ...modelConfig,
      ...updates
    };
    onChange(newConfig);
  };

  const modelConfig = {
    type: modelType,
    endpoint: ollamaConfig.endpoint,
    modelName: ollamaConfig.selectedModel,
    parameters
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Model Configuration
      </Typography>

      {/* Model Type Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Model Type</InputLabel>
        <Select
          value={modelType}
          label="Model Type"
          onChange={(e) => {
            setModelType(e.target.value as 'ollama' | 'external');
            handleSettingsChange({ type: e.target.value as 'ollama' | 'external' });
          }}
        >
          <MenuItem value="ollama">Ollama (Local)</MenuItem>
          <MenuItem value="external">External API</MenuItem>
        </Select>
      </FormControl>

      {/* Ollama Configuration */}
      {modelType === 'ollama' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Ollama Endpoint"
            value={ollamaConfig.endpoint}
            onChange={(e) => {
              setOllamaConfig(prev => ({
                ...prev,
                endpoint: e.target.value
              }));
              handleSettingsChange({ endpoint: e.target.value });
            }}
            margin="normal"
          />

          {ollamaConfig.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : ollamaConfig.error ? (
            <Alert severity="error" sx={{ my: 2 }}>
              {ollamaConfig.error}
            </Alert>
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Model</InputLabel>
              <Select
                value={ollamaConfig.selectedModel}
                label="Select Model"
                onChange={(e) => {
                  setOllamaConfig(prev => ({
                    ...prev,
                    selectedModel: e.target.value
                  }));
                  handleSettingsChange({ modelName: e.target.value });
                }}
              >
                {ollamaConfig.availableModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      {/* External API Configuration */}
      {modelType === 'external' && (
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Provider</InputLabel>
            <Select
              value="openai"
              label="Provider"
              onChange={onChange}
            >
              <MenuItem value="openai">OpenAI</MenuItem>
              <MenuItem value="anthropic">Anthropic</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="API Key"
            type="password"
            margin="normal"
            onChange={onChange}
          />
        </Box>
      )}

      {/* Model Parameters */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Model Parameters
      </Typography>

      <Box sx={{ px: 2 }}>
        <Typography gutterBottom>Temperature</Typography>
        <Slider
          value={parameters.temperature}
          onChange={(_, value) => {
            setParameters(prev => ({
              ...prev,
              temperature: value as number
            }));
            handleSettingsChange({
              parameters: {
                ...parameters,
                temperature: value as number
              }
            });
          }}
          min={0}
          max={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
        />

        <Typography gutterBottom sx={{ mt: 2 }}>
          Max Tokens
        </Typography>
        <Slider
          value={parameters.maxTokens}
          onChange={(_, value) => {
            setParameters(prev => ({
              ...prev,
              maxTokens: value as number
            }));
            handleSettingsChange({
              parameters: {
                ...parameters,
                maxTokens: value as number
              }
            });
          }}
          min={100}
          max={4000}
          step={100}
          marks
          valueLabelDisplay="auto"
        />

        <Typography gutterBottom sx={{ mt: 2 }}>
          Top P
        </Typography>
        <Slider
          value={parameters.topP}
          onChange={(_, value) => {
            setParameters(prev => ({
              ...prev,
              topP: value as number
            }));
            handleSettingsChange({
              parameters: {
                ...parameters,
                topP: value as number
              }
            });
          }}
          min={0}
          max={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          onClick={fetchOllamaModels}
          disabled={modelType !== 'ollama'}
        >
          Refresh Models
        </Button>
      </Box>
    </Box>
  );
};

export default ModelSettings;
```
