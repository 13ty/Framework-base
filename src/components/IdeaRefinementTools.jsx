import React from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button
} from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import BrushIcon from '@mui/icons-material/Brush'
import StorageIcon from '@mui/icons-material/Storage'

const tools = [
  {
    id: 'technical',
    name: 'Technical Specifications',
    description: 'Generate detailed technical requirements',
    icon: CodeIcon
  },
  {
    id: 'architecture',
    name: 'System Architecture',
    description: 'Design system architecture and components',
    icon: ArchitectureIcon
  },
  {
    id: 'ui',
    name: 'UI Components',
    description: 'Generate UI component specifications',
    icon: BrushIcon
  },
  {
    id: 'database',
    name: 'Database Schema',
    description: 'Design database structure and relationships',
    icon: StorageIcon
  }
]

function IdeaRefinementTools() {
  return (
    <Grid container spacing={2}>
      {tools.map((tool) => (
        <Grid item xs={12} sm={6} md={4} key={tool.id}>
          <Paper
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': { boxShadow: 2 }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <tool.icon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                {tool.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {tool.description}
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 'auto' }}
            >
              Generate
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default IdeaRefinementTools
