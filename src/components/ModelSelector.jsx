import React, { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedModel } from '../store/llmConfigSlice'
import axios from 'axios'

function ModelSelector() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { localConfig } = useSelector(state => state.llmConfig)

  useEffect(() => {
    fetchModels()
  }, [localConfig.serverUrl])

  const fetchModels = async () => {
    if (!localConfig.serverUrl) return

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${localConfig.serverUrl}/api/tags`)
      const models = response.data.models || []
      dispatch(setAvailableModels(models))
    } catch (err) {
      setError('Failed to fetch models. Please check your Ollama server connection.')
      console.error('Error fetching models:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={20} />
        <Typography>Loading available models...</Typography>
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select AI Model
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Model</InputLabel>
        <Select
          value={localConfig.selectedModel || ''}
          label="Model"
          onChange={(e) => dispatch(setSelectedModel(e.target.value))}
          sx={{ minWidth: 200 }}
        >
          {localConfig.availableModels.map((model) => (
            <MenuItem key={model} value={model}>
              {model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  )
}

export default ModelSelector
