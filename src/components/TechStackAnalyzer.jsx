import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Tooltip,
  IconButton,
  Collapse,
  Card,
  CardContent,
  Rating
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'

const mockTechAnalysis = {
  frontend: {
    recommended: [
      {
        name: 'React',
        score: 4.5,
        reasons: [
          'Suitable for complex UIs',
          'Large ecosystem',
          'Good performance'
        ],
        considerations: [
          'Learning curve for beginners',
          'Bundle size management needed'
        ]
      },
      {
        name: 'TypeScript',
        score: 4.8,
        reasons: [
          'Type safety',
          'Better IDE support',
          'Reduced runtime errors'
        ],
        considerations: [
          'Additional setup required',
          'Team needs TypeScript experience'
        ]
      }
    ]
  },
  backend: {
    recommended: [
      {
        name: 'Node.js',
        score: 4.3,
        reasons: [
          'JavaScript ecosystem compatibility',
          'Good for real-time features',
          'Large package ecosystem'
        ],
        considerations: [
          'CPU-intensive tasks consideration',
          'Proper error handling needed'
        ]
      }
    ]
  },
  database: {
    recommended: [
      {
        name: 'PostgreSQL',
        score: 4.6,
        reasons: [
          'ACID compliance',
          'Complex query support',
          'JSON support'
        ],
        considerations: [
          'Requires DB administration',
          'Connection pooling setup'
        ]
      }
    ]
  }
}

function TechStackAnalyzer() {
  const [expandedTech, setExpandedTech] = useState({})

  const handleExpandClick = (techName) => {
    setExpandedTech(prev => ({
      ...prev,
      [techName]: !prev[techName]
    }))
  }

  const renderTechCard = (tech) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6">
            {tech.name}
          </Typography>
          <Rating value={tech.score} precision={0.1} readOnly />
        </Box>

        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={tech.score * 20}
            sx={{ 
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Confidence Score
          </Typography>
          <Typography variant="body2" color="primary">
            {tech.score * 20}%
          </Typography>
        </Box>

        <IconButton
          onClick={() => handleExpandClick(tech.name)}
          sx={{
            transform: expandedTech[tech.name] ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s'
          }}
        >
          <ExpandMoreIcon />
        </IconButton>

        <Collapse in={expandedTech[tech.name]}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Advantages
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {tech.reasons.map((reason, index) => (
                <Chip
                  key={index}
                  icon={<CheckCircleIcon />}
                  label={reason}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Considerations
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tech.considerations.map((consideration, index) => (
                <Chip
                  key={index}
                  icon={<WarningIcon />}
                  label={consideration}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Technology Stack Analysis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Frontend Stack
            </Typography>
            {mockTechAnalysis.frontend.recommended.map((tech) => (
              renderTechCard(tech)
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Backend Stack
            </Typography>
            {mockTechAnalysis.backend.recommended.map((tech) => (
              renderTechCard(tech)
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Database Stack
            </Typography>
            {mockTechAnalysis.database.recommended.map((tech) => (
              renderTechCard(tech)
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TechStackAnalyzer
