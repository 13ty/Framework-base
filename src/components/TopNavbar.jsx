import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import GitHubIcon from '@mui/icons-material/GitHub'

function TopNavbar() {
  const navigate = useNavigate()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton 
          color="inherit" 
          onClick={() => navigate('/')}
          edge="start"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1 }}
        >
          AI App Idea Generator
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit"
            onClick={() => navigate('/workspace')}
          >
            Workspace
          </Button>
          <Button 
            color="inherit"
            onClick={() => navigate('/notebook')}
          >
            Notebook
          </Button>
          <Button 
            color="inherit"
            onClick={() => navigate('/concept')}
          >
            Concept
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNavbar
