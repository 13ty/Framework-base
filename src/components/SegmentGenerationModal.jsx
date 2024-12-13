import React, { useState } from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material'

function SegmentGenerationModal({ 
  open, 
  onClose, 
  onGenerate 
}) {
  const [category, setCategory] = useState('')
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    onGenerate({ category, prompt })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Generate New Segments</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Segment Category</InputLabel>
          <Select
            value={category}
            label="Segment Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="ui">UI Design</MenuItem>
            <MenuItem value="functionality">Functionality</MenuItem>
            <MenuItem value="integration">API Integration</MenuItem>
            <MenuItem value="interaction">User Interaction</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Detailed Prompt for LLM"
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleGenerate} 
          variant="contained" 
          color="primary"
        >
          Generate Segments
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SegmentGenerationModal
