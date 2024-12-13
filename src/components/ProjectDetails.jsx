import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateCurrentProjectConcept } from '../store/conversationSlice'

function ProjectDetails({ project }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editedProject, setEditedProject] = useState(project)
  const dispatch = useDispatch()

  const handleSave = () => {
    dispatch(updateCurrentProjectConcept(editedProject))
    setEditDialogOpen(false)
  }

  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start' 
        }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            onClick={() => setEditDialogOpen(true)}
          >
            Edit Details
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Elements ({project.elements.length})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.elements.map((element, index) => (
              <Chip 
                key={index}
                label={element.description}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        {project.iterations.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Development History
            </Typography>
            {project.iterations.map((iteration, index) => (
              <Paper 
                key={index} 
                variant="outlined" 
                sx={{ p: 2, mb: 1 }}
              >
                <Typography variant="body2">
                  {iteration.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(iteration.timestamp).toLocaleString()}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Project Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Name"
            value={editedProject.name}
            onChange={(e) => setEditedProject({
              ...editedProject,
              name: e.target.value
            })}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={editedProject.description}
            onChange={(e) => setEditedProject({
              ...editedProject,
              description: e.target.value
            })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProjectDetails
