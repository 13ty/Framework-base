import React, { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useSelector } from 'react-redux'
import ResponseSegment from './ResponseSegment'

function MainWorkspace() {
  const [userInput, setUserInput] = useState('')
  const [responses, setResponses] = useState([])
  const settings = useSelector(state => state.settings)

  const handleSubmit = async () => {
    if (!userInput.trim()) return
    
    // Check if model is selected
    if (!settings.selectedModel && settings.modelType === 'local') {
      alert('Please select a model in settings first')
      return
    }

    try {
      let response
      if (settings.modelType === 'local') {
        response = await fetch(`${settings.ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: settings.selectedModel,
            prompt: userInput,
            stream: false
          })
        })
        
        const data = await response.json()
        setResponses([...responses, {
          id: Date.now(),
          content: data.response,
          type: 'feature'
        }])
      } else {
        // Handle external API call
        // Implement based on provider
      }
    } catch (error) {
      console.error('Error generating response:', error)
      alert('Failed to generate response. Please check your settings and try again.')
    }
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        pt: '64px' // Height of TopNavbar
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Describe Your App Idea
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Start typing your app idea here..."
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '1.1rem',
                lineHeight: 1.6
              }
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            mt: 2 
          }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!userInput.trim()}
            >
              Generate Ideas
            </Button>
          </Box>
        </Paper>

        {responses.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Generated Ideas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {responses.map((response) => (
                <ResponseSegment
                  key={response.id}
                  segment={response}
                  onAdd={() => {/* Handle adding to final idea */}}
                />
              ))}
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default MainWorkspace
