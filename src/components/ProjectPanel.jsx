import React, { useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function ProjectPanel() {
  const [projects, setProjects] = useState([])
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      setProjects([
        ...projects,
        {
          id: Date.now(),
          name: newProjectName,
          createdAt: new Date().toISOString()
        }
      ])
      setNewProjectName('')
      setIsNewProjectDialogOpen(false)
    }
  }

  return (
    <Box sx={{ p: 2, mt: '64px' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h6">
          Projects
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setIsNewProjectDialogOpen(true)}
        >
          New Project
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            secondaryAction={
              <Box>
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary={project.name}
              secondary={new Date(project.createdAt).toLocaleDateString()}
            />
          </ListItem>
        ))}
        {projects.length === 0 && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ textAlign: 'center', py: 4 }}
          >
            No projects yet. Create one to get started!
          </Typography>
        )}
      </List>

      {/* New Project Dialog */}
      <Dialog
        open={isNewProjectDialogOpen}
        onClose={() => setIsNewProjectDialogOpen(false)}
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewProjectDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateProject} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectPanel
