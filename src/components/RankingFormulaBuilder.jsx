import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Slider,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material'
import FunctionsIcon from '@mui/icons-material/Functions'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import TimelineIcon from '@mui/icons-material/Timeline'
import SchoolIcon from '@mui/icons-material/School'

function RankingFormulaBuilder() {
  const [weights, setWeights] = useState({
    novelty: 0.3,
    impact: 0.2,
    citations: 0.15,
    recency: 0.15,
    relevance: 0.2
  })

  const [thresholds, setThresholds] = useState({
    minNovelty: 0.7,
    minCitations: 10,
    maxAge: 5
  })

  const generateFormula = () => {
    return `
      score = (
        ${weights.novelty} * novelty_score +
        ${weights.impact} * impact_factor +
        ${weights.citations} * normalized_citations +
        ${weights.recency} * recency_score +
        ${weights.relevance} * relevance_score
      )
      
      filters = [
        novelty_score >= ${thresholds.minNovelty},
        citations >= ${thresholds.minCitations},
        age <= ${thresholds.maxAge}
      ]
    `
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Ranking Formula Builder
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weight Configuration
            </Typography>

            {Object.entries(weights).map(([factor, value]) => (
              <Box key={factor} sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  {factor.charAt(0).toUpperCase() + factor.slice(1)} Weight
                </Typography>
                <Slider
                  value={value}
                  onChange={(_, newValue) => setWeights({
                    ...weights,
                    [factor]: newValue
                  })}
                  step={0.05}
                  min={0}
                  max={1}
                  valueLabelDisplay="auto"
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Threshold Configuration
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Minimum Novelty Score
              </Typography>
              <Slider
                value={thresholds.minNovelty}
                onChange={(_, newValue) => setThresholds({
                  ...thresholds,
                  minNovelty: newValue
                })}
                step={0.1}
                min={0}
                max={1}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Minimum Citations
              </Typography>
              <Slider
                value={thresholds.minCitations}
                onChange={(_, newValue) => setThresholds({
                  ...thresholds,
                  minCitations: newValue
                })}
                step={5}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Maximum Age (years)
              </Typography>
              <Slider
                value={thresholds.maxAge}
                onChange={(_, newValue) => setThresholds({
                  ...thresholds,
                  maxAge: newValue
                })}
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Generated Formula
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={generateFormula()}
              InputProps={{
                readOnly: true
              }}
            />
            <Button
              variant="contained"
              startIcon={<FunctionsIcon />}
              sx={{ mt: 2 }}
            >
              Apply Formula
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RankingFormulaBuilder
