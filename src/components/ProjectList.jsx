import React from 'react'
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

function ProjectList({ projects, onDelete, onEdit }) {
  const navigate = useNavigate()

  if (!projects.length) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No projects yet. Start by creating a new project!
        </Typography>
      </Paper>
    )
  }

  return (
    <List>
      {projects.map((project) => (
        <ListItem 
          key={project.id}
          button
          onClick={() => navigate(`/project/${project.id}`)}
          sx={{
            mb: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <ListItemText
            primary={project.name}
            secondary={
              <>
                <Typography variant="body2" color="text.secondary">
                  {project.description || 'No description'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(project)
              }}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(project.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default ProjectList
