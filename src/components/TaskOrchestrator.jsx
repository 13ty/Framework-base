import React, { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Dialog,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import EmailIcon from '@mui/icons-material/Email'
import StorageIcon from '@mui/icons-material/Storage'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import AnalyticsIcon from '@mui/icons-material/Analytics'

function TaskOrchestrator() {
  const [tasks, setTasks] = useState([])
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [taskResults, setTaskResults] = useState({})

  const taskTypes = {
    emailSurvey: {
      name: 'Email Survey',
      icon: EmailIcon,
      description: 'Send surveys and collect responses',
      configFields: [
        'emailTemplate',
        'targetList',
        'responseDatabase',
        'followupConditions'
      ]
    },
    dataCollection: {
      name: 'Data Collection',
      icon: StorageIcon,
      description: 'Collect and analyze data from multiple sources',
      configFields: [
        'dataSources',
        'collectionFrequency',
        'processingRules'
      ]
    },
    analysis: {
      name: 'Analysis Task',
      icon: AnalyticsIcon,
      description: 'Analyze collected data and generate insights',
      configFields: [
        'dataSource',
        'analysisType',
        'outputFormat'
      ]
    }
  }

  const renderTaskCard = (task) => {
    const TaskIcon = taskTypes[task.type].icon

    return (
      <Card 
        sx={{ 
          mb: 2,
          position: 'relative',
          overflow: 'visible'
        }}
      >
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TaskIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                {task.name}
              </Typography>
            </Box>
            <Box>
              <Chip
                label={task.status}
                color={
                  task.status === 'running' ? 'success' :
                  task.status === 'paused' ? 'warning' :
                  'default'
                }
                size="small"
              />
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {task.description}
          </Typography>

          {task.progress && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress
                variant="determinate"
                value={task.progress}
                size={24}
              />
              <Typography variant="body2">
                {task.progress}% Complete
              </Typography>
            </Box>
          )}

          {task.status === 'running' && task.lastUpdate && (
            <Typography 
              variant="caption" 
              display="block"
              sx={{ mt: 1 }}
            >
              Last Update: {new Date(task.lastUpdate).toLocaleString()}
            </Typography>
          )}

          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={task.status === 'running' ? <PauseIcon /> : <PlayArrowIcon />}
              onClick={() => handleTaskAction(task.id, 
                task.status === 'running' ? 'pause' : 'start'
              )}
            >
              {task.status === 'running' ? 'Pause' : 'Start'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AssignmentIcon />}
              onClick={() => setSelectedTask(task)}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    )
  }

  const handleTaskAction = async (taskId, action) => {
    // Implement task control logic
    console.log(`Task ${taskId} ${action}`)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5">
          Task Orchestrator
        </Typography>
        <Button
          variant="contained"
          startIcon={<AutorenewIcon />}
          onClick={() => setShowNewTaskDialog(true)}
        >
          New Long-Running Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Active Tasks
            </Typography>
            {tasks.map(task => renderTaskCard(task))}
            {tasks.length === 0 && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                No active tasks. Create one to get started!
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Task Results
            </Typography>
            <List>
              {Object.entries(taskResults).map(([taskId, result]) => (
                <ListItem key={taskId}>
                  <ListItemIcon>
                    {result.success ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <ErrorIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={result.name}
                    secondary={result.summary}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Task Configuration Dialog */}
      <Dialog
        open={showNewTaskDialog}
        onClose={() => setShowNewTaskDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Configure New Task
          </Typography>
          
          {/* Task configuration form */}
          {/* Add form fields based on selected task type */}
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setShowNewTaskDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained">
              Create Task
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog
          open={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          maxWidth="md"
          fullWidth
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Details
            </Typography>
            
            {/* Task details content */}
            
            <Box sx={{ mt: 3 }}>
              <Button onClick={() => setSelectedTask(null)}>
                Close
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}

export default TaskOrchestrator
