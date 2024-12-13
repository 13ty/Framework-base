import React, { useState } from 'react'
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setProjectDetails } from '../store/ideaSlice'

function IdeaGenerator() {
  const [projectType, setProjectType] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setProjectDetails({ 
      projectType, 
      description 
    }))
    // TODO: Implement AI prompt generation logic
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Generate Your App Idea
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Project Type</InputLabel>
        <Select
          value={projectType}
          label="Project Type"
          onChange={(e) => setProjectType(e.target.value)}
        >
          <MenuItem value="web">Web Application</MenuItem>
          <MenuItem value="mobile">Mobile App</MenuItem>
          <MenuItem value="desktop">Desktop App</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Describe Your App Idea"
        variant="outlined"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
      >
        Generate AI Suggestions
      </Button>
    </Container>
  )
}

export default IdeaGenerator
