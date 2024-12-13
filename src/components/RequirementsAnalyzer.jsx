import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Tooltip,
  LinearProgress
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import WorkIcon from '@mui/icons-material/Work'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import StorageIcon from '@mui/icons-material/Storage'
import ApiIcon from '@mui/icons-material/Api'

function RequirementsAnalyzer({ projectRequirements }) {
  const [expandedSections, setExpandedSections] = useState({})

  const categories = {
    functional: {
      icon: ApiIcon,
      title: 'Functional Requirements',
      color: 'primary'
    },
    technical: {
      icon: StorageIcon,
      title: 'Technical Requirements',
      color: 'secondary'
    },
    performance: {
      icon: SpeedIcon,
      title: 'Performance Requirements',
      color: 'success'
    },
    security: {
      icon: SecurityIcon,
      title: 'Security Requirements',
      color: 'error'
    }
  }

  const mockAnalysis = {
    functional: [
      {
        name: 'User Authentication',
        priority: 'High',
        complexity: 4,
        timeEstimate: '1-2 weeks',
        dependencies: ['Database Setup', 'API Layer'],
        considerations: [
          'OAuth integration needed',
          'Password recovery system',
          'Role-based access control'
        ]
      },
      // Add more functional requirements
    ],
    technical: [
      {
        name: 'Database Architecture',
        priority: 'High',
        complexity: 5,
        timeEstimate: '2-3 weeks',
        dependencies: ['Data Model Design'],
        considerations: [
          'Scalability requirements',
          'Data redundancy',
          'Backup strategy'
        ]
      },
      // Add more technical requirements
    ],
    // Add more categories
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderRequirementCard = (requirement) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{requirement.name}</Typography>
          <Chip 
            label={requirement.priority} 
            color={requirement.priority === 'High' ? 'error' : 'warning'}
            size="small"
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Complexity
            </Typography>
            <Rating value={requirement.complexity} readOnly />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Time Estimate
            </Typography>
            <Typography variant="body1">
              {requirement.timeEstimate}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" gutterBottom>
          Dependencies
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {requirement.dependencies.map((dep, index) => (
            <Chip
              key={index}
              label={dep}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Key Considerations
        </Typography>
        <List dense>
          {requirement.considerations.map((consideration, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <PriorityHighIcon color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={consideration}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Requirements Analysis
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(categories).map(([key, category]) => (
          <Grid item xs={12} md={6} key={key}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <category.icon color={category.color} sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {category.title}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={() => toggleSection(key)}
                  sx={{
                    transform: expandedSections[key] ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s'
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              <Collapse in={expandedSections[key]}>
                {mockAnalysis[key]?.map((req, index) => (
                  renderRequirementCard(req)
                ))}
              </Collapse>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RequirementsAnalyzer
