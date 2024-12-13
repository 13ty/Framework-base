import React, { useState, useEffect } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Tabs,
  Tab,
  Box,
  Typography
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  setModelType,
  setLocalServerUrl,
  setAvailableModels,
  setSelectedModel,
  setExternalConfig,
  updatePrompt,
  resetPromptToDefault
} from '../store/llmConfigSlice'

function LLMConfigModal({ open, onClose }) {
  const dispatch = useDispatch()
  const llmConfig = useSelector(state => state.llmConfig)
  const [activeTab, setActiveTab] = useState(0)
  const [localUrl, setLocalUrl] = useState(llmConfig.localConfig.serverUrl)
  const [apiKey, setApiKey] = useState(llmConfig.externalConfig.apiKey)

  useEffect(() => {
    if (llmConfig.modelType === 'local' && localUrl) {
      fetchLocalModels()
    }
  }, [localUrl])

  const fetchLocalModels = async () => {
    try {
      const response = await axios.get(`${localUrl}/api/tags`)
      dispatch(setAvailableModels(response.data.models))
    } catch (error) {
      console.error('Failed to fetch local models', error)
    }
  }

  const handleSaveLocalConfig = () => {
    dispatch(setLocalServerUrl(localUrl))
  }

  const handleSaveExternalConfig = () => {
    dispatch(setExternalConfig({ apiKey }))
  }

  const handlePromptUpdate = (promptKey, value) => {
    dispatch(updatePrompt({ promptKey, promptValue: value }))
  }

  const handleResetPrompt = (promptKey) => {
    dispatch(resetPromptToDefault({ promptKey }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>LLM Configuration</DialogTitle>
      <DialogContent>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Model Selection" />
          <Tab label="Prompt Configuration" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Model Type</InputLabel>
              <Select
                value={llmConfig.modelType}
                label="Model Type"
                onChange={(e) => dispatch(setModelType(e.target.value))}
              >
                <MenuItem value="local">Local (Ollama)</MenuItem>
                <MenuItem value="external">External API</MenuItem>
              </Select>
            </FormControl>

            {llmConfig.modelType === 'local' && (
              <>
                <TextField
                  fullWidth
                  label="Ollama Server URL"
                  value={localUrl}
                  onChange={(e) => setLocalUrl(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleSaveLocalConfig}
                >
                  Fetch Local Models
                </Button>

                {llmConfig.localConfig.availableModels.length > 0 && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Available Models</InputLabel>
                    <Select
                      value={llmConfig.localConfig.selectedModel || ''}
                      label="Available Models"
                      onChange={(e) => dispatch(setSelectedModel(e.target.value))}
                    >
                      {llmConfig.localConfig.availableModels.map(model => (
                        <MenuItem key={model} value={model}>
                          {model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </>
            )}

            {llmConfig.modelType === 'external' && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Provider</InputLabel>
                  <Select
                    value={llmConfig.externalConfig.provider}
                    label="Provider"
                    onChange={(e) => dispatch(setExternalConfig({ 
                      provider: e.target.value 
                    }))}
                  >
                    <MenuItem value="openai">OpenAI</MenuItem>
                    <MenuItem value="anthropic">Anthropic</MenuItem>
                    <MenuItem value="google">Google</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="API Key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleSaveExternalConfig}
                >
                  Save API Configuration
                </Button>
              </>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            {Object.entries(llmConfig.prompts).map(([promptKey, promptValue]) => (
              <Box key={promptKey} sx={{ mb: 3 }}>
                <Typography variant="subtitle1">
                  {promptKey.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={promptValue}
                  onChange={(e) => handlePromptUpdate(promptKey, e.target.value)}
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => handleResetPrompt(promptKey)}
                >
                  Reset to Default
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LLMConfigModal
