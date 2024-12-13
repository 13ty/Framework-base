import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { formatDistanceToNow } from 'date-fns'

function ProjectAnalytics({ projectData }) {
  const mockAnalytics = {
    completionRate: 65,
    taskVelocity: 8.5,
    recentActivities: [
      {
        type: 'completion',
        description: 'User Authentication Module completed',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        type: 'delay',
        description: 'Database Schema Design delayed',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        type: 'progress',
        description: 'API Integration started',
        timestamp: new Date(Date.now() - 10800000)
      }
    ],
    risks: [
      {
        severity: 'high',
        description: 'Security vulnerabilities in payment system'
      },
      {
        severity: 'medium',
        description: 'Performance bottleneck in data processing'
      }
    ]
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Project Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Completion Progress */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Overall Progress
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {mockAnalytics.completionRate}% Complete
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={mockAnalytics.completionRate}
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Task Velocity */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Task Velocity
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mt: 2
            }}>
              <Typography variant="h4">
                {mockAnalytics.taskVelocity}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                tasks/week
              </Typography>
              <TrendingUpIcon 
                color="success" 
                sx={{ ml: 2 }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {mockAnalytics.recentActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {activity.type === 'completion' ? (
                      <CheckCircleIcon color="success" />
                    ) : activity.type === 'delay' ? (
                      <ErrorIcon color="error" />
                    ) : (
                      <TrendingUpIcon color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.description}
                    secondary={formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true 
                    })}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Risk Assessment */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Risk Assessment
            </Typography>
            <List>
              {mockAnalytics.risks.map((risk, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ErrorIcon 
                      color={risk.severity === 'high' ? 'error' : 'warning'} 
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={risk.description}
                    secondary={
                      <Chip
                        label={risk.severity}
                        size="small"
                        color={risk.severity === 'high' ? 'error' : 'warning'}
                        variant="outlined"
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectAnalytics
