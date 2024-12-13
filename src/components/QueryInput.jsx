import React, { useState } from 'react'
import { 
  Paper,
  TextField, 
  Button, 
  Box,
  Typography
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch, useSelector } from 'react-redux'
import { addSearchToHistory } from '../store/historySlice'

function QueryInput({ onGenerateIdeas }) {
  const [query, setQuery] = useState('')
  const selectedModel = useSelector(state => state.llmConfig.localConfig.selectedModel)
  const dispatch = useDispatch()

  const handleGenerateIdeas = () => {
    if (!selectedModel) {
      alert('Please select an AI model first')
      return
    }

    if (query.trim()) {
      dispatch(addSearchToHistory({ query }))
      onGenerateIdeas(query)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      handleGenerateIdeas()
    }
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        mb: 4,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Describe Your App Idea
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Describe your app idea in detail. For example: Create a language learning app that uses AI to generate personalized lessons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '1.1rem',
            lineHeight: 1.6
          }
        }}
      />
      <Box sx={{ 
        mt: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="caption" color="text.secondary">
          Press Shift + Enter to generate ideas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          onClick={handleGenerateIdeas}
          disabled={!selectedModel}
        >
          Generate Ideas
        </Button>
      </Box>
    </Paper>
  )
}

export default QueryInput
