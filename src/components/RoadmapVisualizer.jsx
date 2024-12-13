import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const phases = [
  {
    id: 1,
    title: 'Phase 1: MVP Development',
    duration: '4 weeks',
    tasks: [
      { id: 1, name: 'Core Features Implementation', status: 'in-progress' },
      { id: 2, name: 'Basic UI Development', status: 'pending' },
      { id: 3, name: 'Initial Testing', status: 'pending' }
    ]
  },
  {
    id: 2,
    title: 'Phase 2: Enhanced Features',
    duration: '6 weeks',
    tasks: [
      { id: 4, name: 'Advanced Features', status: 'pending' },
      { id: 5, name: 'Performance Optimization', status: 'pending' }
    ]
  },
  {
    id: 3,
    title: 'Phase 3: Polish & Launch',
    duration: '2 weeks',
    tasks: [
      { id: 6, name: 'Final Testing', status: 'pending' },
      { id: 7, name: 'Deployment', status: 'pending' }
    ]
  }
]

function RoadmapVisualizer() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedPhase, setSelectedPhase] = useState(null)

  const handleMenuClick = (event, phase) => {
    setAnchorEl(event.currentTarget)
    setSelectedPhase(phase)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedPhase(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success.main'
      case 'in-progress':
        return 'primary.main'
      default:
        return 'grey.400'
    }
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h6">Development Roadmap</Typography>
        <Button 
          startIcon={<AddIcon />}
          variant="outlined"
        >
          Add Phase
        </Button>
      </Box>

      <Timeline position="right">
        {phases.map((phase, index) => (
          <TimelineItem key={phase.id}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < phases.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  mb: 2,
                  '&:hover': {
                    boxShadow: 2
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <Box>
                    <Typography variant="subtitle1">
                      {phase.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                    >
                      Duration: {phase.duration}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, phase)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ pl: 2 }}>
                  {phase.tasks.map((task) => (
                    <Box
                      key={task.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: getStatusColor(task.status)
                        }}
                      />
                      <Typography variant="body2">
                        {task.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} /> Edit Phase
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <AddIcon sx={{ mr: 1 }} /> Add Task
        </MenuItem>
        <MenuItem 
          onClick={handleMenuClose}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete Phase
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default RoadmapVisualizer
