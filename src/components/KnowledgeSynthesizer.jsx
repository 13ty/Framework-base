import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import MergeTypeIcon from '@mui/icons-material/MergeType'
import InsightsIcon from '@mui/icons-material/Insights'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import PsychologyIcon from '@mui/icons-material/Psychology'

function KnowledgeSynthesizer() {
  const [insights, setInsights] = useState([])
  const [synthesisProgress, setSynthesisProgress] = useState({
    status: 'idle',
    progress: 0,
    phase: ''
  })

  const renderInsightCard = (insight) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <Typography variant="h6">
            {insight.title}
          </Typography>
          <Chip
            icon={<LightbulbIcon />}
            label={insight.type}
            color="primary"
            size="small"
          />
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {insight.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Confidence Score
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={insight.confidence} 
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            Based on {insight.sourcesCount} sources
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Connected Concepts
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {insight.connections.map((connection, index) => (
              <Chip
                key={index}
                label={connection}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h6">
                Knowledge Synthesis
              </Typography>
              <Button
                variant="contained"
                startIcon={<MergeTypeIcon />}
                disabled={synthesisProgress.status === 'running'}
              >
                Start Synthesis
              </Button>
            </Box>

            {synthesisProgress.status === 'running' && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  {synthesisProgress.phase}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={synthesisProgress.progress} 
                />
              </Box>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <InsightsIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Insights Generated
                      </Typography>
                    </Box>
                    <Typography variant="h3" color="primary">
                      {insights.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUpIcon color="secondary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Knowledge Growth
                      </Typography>
                    </Box>
                    <Typography variant="h3" color="secondary">
                      +23%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Latest Insights
            </Typography>
            {insights.map((insight, index) => renderInsightCard(insight))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Synthesis Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AutoFixHighIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Pattern Recognition"
                  secondary="Identify common patterns and relationships"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PsychologyIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Concept Mapping"
                  secondary="Create knowledge concept maps"
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Knowledge Stats
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Sources Analyzed"
                  secondary={
                    <LinearProgress 
                      variant="determinate" 
                      value={75} 
                      sx={{ mt: 1 }}
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Concept Coverage"
                  secondary={
                    <LinearProgress 
                      variant="determinate" 
                      value={60} 
                      sx={{ mt: 1 }}
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Verification Level"
                  secondary={
                    <LinearProgress 
                      variant="determinate" 
                      value={85} 
                      sx={{ mt: 1 }}
                    />
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default KnowledgeSynthesizer
