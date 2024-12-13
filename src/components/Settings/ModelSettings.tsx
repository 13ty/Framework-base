import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  CircularProgress,
  Slider,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import ModelConfigService, { ModelSettings, OllamaModel } from '../../services/ModelConfigService';

interface ModelSettingsProps {
  onSettingsChange?: (settings: ModelSettings) => void;
}

const ModelSettings: React.FC<ModelSettingsProps> = ({ onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState<ModelSettings>(
    ModelConfigService.getInstance().getSettings()
  );
  const [ollamaModels, setOllamaModels] = useState<OllamaModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  useEffect(() => {
    if (settings.type === 'ollama') {
      fetchOllamaModels();
    }
  }, [settings.ollamaEndpoint]);

  const fetchOllamaModels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const models = await ModelConfigService.getInstance().getOllamaModels();
      setOllamaModels(models);
    } catch (err) {
      setError('Failed to fetch Ollama models. Please check your endpoint.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (
    updates: Partial<ModelSettings>
  ) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    ModelConfigService.getInstance().updateSettings(updates);
    onSettingsChange?.(newSettings);
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    setError(null);
    try {
      const success = settings.type === 'ollama'
        ? await ModelConfigService.getInstance().testOllamaConnection()
        : await ModelConfigService.getInstance().testExternalConnection();

      if (!success) {
        throw new Error('Connection test failed');
      }
    } catch (err) {
      setError('Connection test failed. Please check your settings.');
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Model Settings
      </Typography>

      <Tabs 
        value={activeTab} 
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Model Selection" />
        <Tab label="Parameters" />
        <Tab label="Advanced" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Model Type</InputLabel>
            <Select
              value={settings.type}
              label="Model Type"
              onChange={(e) => handleSettingsChange({ 
                type: e.target.value as ModelSettings['type']
              })}
            >
              <MenuItem value="ollama">Ollama (Local)</MenuItem>
              <MenuItem value="external">External API</MenuItem>
            </Select>
          </FormControl>

          {settings.type === 'ollama' ? (
            <>
              <TextField
                fullWidth
                label="Ollama Endpoint"
                value={settings.ollamaEndpoint}
                onChange={(e) => handleSettingsChange({ 
                  ollamaEndpoint: e.target.value 
                })}
                sx={{ mb: 2 }}
              />

              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select Model</InputLabel>
                  <Select
                    value={settings.selectedModel || ''}
                    label="Select Model"
                    onChange={(e) => handleSettingsChange({ 
                      selectedModel: e.target.value 
                    })}
                  >
                    {ollamaModels.map((model) => (
                      <MenuItem key={model.name} value={model.name}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </>
          ) : (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Provider</InputLabel>
                <Select
                  value={settings.externalConfig?.provider || 'custom'}
                  label="Provider"
                  onChange={(e) => handleSettingsChange({
                    externalConfig: {
                      ...settings.externalConfig,
                      provider: e.target.value as ExternalModelConfig['provider']
                    }
                  })}
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
                value={settings.externalConfig?.apiKey || ''}
                onChange={(e) => handleSettingsChange({
                  externalConfig: {
                    ...settings.externalConfig,
                    apiKey: e.target.value
                  }
                })}
                sx={{ mb: 2 }}
              />

              {settings.externalConfig?.provider === 'custom' && (
                <TextField
                  fullWidth
                  label="API Endpoint"
                  value={settings.externalConfig?.endpoint || ''}
                  onChange={(e) => handleSettingsChange({
                    externalConfig: {
                      ...settings.externalConfig,
                      endpoint: e.target.value
                    }
                  })}
                  sx={{ mb: 2 }}
                />
              )}
            </>
          )}

          <Button
            variant="contained"
            onClick={testConnection}
            disabled={isTestingConnection}
            sx={{ mt: 2 }}
          >
            {isTestingConnection ? (
              <CircularProgress size={24} />
            ) : (
              'Test Connection'
            )}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography gutterBottom>Temperature</Typography>
          <Slider
            value={settings.parameters.temperature}
            onChange={(_, value) => handleSettingsChange({
              parameters: {
                ...settings.parameters,
                temperature: value as number
              }
            })}
            min={0}
            max={1}
            step={0.1}
            marks
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>Max Tokens</Typography>
          <Slider
            value={settings.parameters.maxTokens}
            onChange={(_, value) => handleSettingsChange({
              parameters: {
                ...settings.parameters,
                maxTokens: value as number
              }
            })}
            min={100}
            max={4000}
            step={100}
            marks
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>Top P</Typography>
          <Slider
            value={settings.parameters.topP}
            onChange={(_, value) => handleSettingsChange({
              parameters: {
                ...settings.parameters,
                topP: value as number
              }
            })}
            min={0}
            max={1}
            step={0.1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Advanced Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={settings.parameters.frequencyPenalty > 0}
                onChange={(e) => handleSettingsChange({
                  parameters: {
                    ...settings.parameters,
                    frequencyPenalty: e.target.checked ? 0.5 : 0
                  }
                })}
              />
            }
            label="Enable Frequency Penalty"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={settings.parameters.presencePenalty > 0}
                onChange={(e) => handleSettingsChange({
                  parameters: {
                    ...settings.parameters,
                    presencePenalty: e.target.checked ? 0.5 : 0
                  }
                })}
              />
            }
            label="Enable Presence Penalty"
          />
        </Box>
      )}
    </Paper>
  );
};

export default ModelSettings;
