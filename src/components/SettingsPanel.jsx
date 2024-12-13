import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettings } from '../store/settingsSlice'
import axios from 'axios'

function SettingsPanel({ onClose }) {
  const dispatch = useDispatch()
  const settings = useSelector(state => state.settings)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [localSettings, setLocalSettings] = useState({
    modelType: 'local', // 'local' or 'external'
    ollamaUrl: 'http://localhost:11434',
    selectedModel: '',
    apiKey: '',
    provider: 'openai'
  })
  const [availableModels, setAvailableModels] = useState([])

  useEffect(() => {
    if (localSettings.modelType === 'local') {
      fetchAvailableModels()
    }
  }, [localSettings.ollamaUrl])

  const fetchAvailableModels = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${localSettings.ollamaUrl}/api/tags`)
      setAvailableModels(response.data.models || [])
    } catch (err) {
      setError('Failed to fetch models. Please check your Ollama server URL.')
      console.error('Error fetching models:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    dispatch(updateSettings(localSettings))
    onClose()
  }

  const handleTestConnection = async () => {
    setLoading(true)
    setError(null)
    try {
      if (localSettings.modelType === 'local') {
        await axios.get(`${localSettings.ollamaUrl}/api/tags`)
        setError('Connection successful!')
      } else {
        // Test external API connection
        // Implement based on provider
      }
    } catch (err) {
      setError('Connection failed. Please check your settings.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h6">Settings</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {error && (
        <Alert 
          severity={error.includes('successful') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Model Type</InputLabel>
        <Select
          value={localSettings.modelType}
          label="Model Type"
          onChange={(e) => setLocalSettings({
            ...localSettings,
            modelType: e.target.value
          })}
        >
          <MenuItem value="local">Local (Ollama)</MenuItem>
          <MenuItem value="external">External API</MenuItem>
        </Select>
      </FormControl>

      {localSettings.modelType === 'local' ? (
        <>
          <TextField
            fullWidth
            label="Ollama Server URL"
            value={localSettings.ollamaUrl}
            onChange={(e) => setLocalSettings({
              ...localSettings,
              ollamaUrl: e.target.value
            })}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Model</InputLabel>
            <Select
              value={localSettings.selectedModel}
              label="Select Model"
              onChange={(e) => setLocalSettings({
                ...localSettings,
                selectedModel: e.target.value
              })}
              disabled={loading || availableModels.length === 0}
            >
              {availableModels.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Provider</InputLabel>
            <Select
              value={localSettings.provider}
              label="Provider"
              onChange={(e) => setLocalSettings({
                ...localSettings,
                provider: e.target.value
              })}
            >
              <MenuItem value="openai">OpenAI</MenuItem>
              <MenuItem value="anthropic">Anthropic</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="API Key"
            type="password"
            value={localSettings.apiKey}
            onChange={(e) => setLocalSettings({
              ...localSettings,
              apiKey: e.target.value
            })}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleTestConnection}
          disabled={loading}
          sx={{ flex: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Test Connection'}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{ flex: 1 }}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsPanel
