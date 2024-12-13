import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Slider,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  Card,
  CardContent
} from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

function ResourceEstimator() {
  const [projectParams, setProjectParams] = useState({
    complexity: 50,
    teamSize: 3,
    duration: 3,
    features: 5
  })

  const [estimates, setEstimates] = useState({
    development: {
      hours: 480,
      cost: 48000
    },
    testing: {
      hours: 120,
      cost: 9600
    },
    deployment: {
      hours: 40,
      cost: 4000
    },
    maintenance: {
      hours: 80,
      cost: 8000
    }
  })

  const calculateEstimates = () => {
    // Implement actual calculation logic
    // This is a placeholder for demonstration
    const baseHours = projectParams.complexity * projectParams.features
    const adjustedHours = baseHours * (projectParams.teamSize / 3)
    
    setEstimates({
      development: {
        hours: adjustedHours,
        cost: adjustedHours * 100
      },
      testing: {
        hours: adjustedHours * 0.25,
        cost: adjustedHours * 0.25 * 80
      },
      deployment: {
        hours: 40,
        cost: 4000
      },
      maintenance: {
        hours: adjustedHours * 0.2,
        cost: adjustedHours * 0.2 * 100
      }
    })
  }

  const renderMetricCard = (title, value, icon, color) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Resource Estimator
      </Typography>

      <Grid container spacing={3}>
        {/* Project Parameters */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Project Parameters
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Project Complexity
              </Typography>
              <Slider
                value={projectParams.complexity}
                onChange={(_, value) => setProjectParams({
                  ...projectParams,
                  complexity: value
                })}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: 'Simple' },
                  { value: 50, label: 'Medium' },
                  { value: 100, label: 'Complex' }
                ]}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Team Size"
                  type="number"
                  value={projectParams.teamSize}
                  onChange={(e) => setProjectParams({
                    ...projectParams,
                    teamSize: parseInt(e.target.value)
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Duration (months)"
                  type="number"
                  value={projectParams.duration}
                  onChange={(e) => setProjectParams({
                    ...projectParams,
                    duration: parseInt(e.target.value)
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Features"
                  type="number"
                  value={projectParams.features}
                  onChange={(e) => setProjectParams({
                    ...projectParams,
                    features: parseInt(e.target.value)
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              onClick={calculateEstimates}
              sx={{ mt: 3 }}
              fullWidth
            >
              Calculate Estimates
            </Button>
          </Paper>
        </Grid>

        {/* Estimates Display */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {renderMetricCard(
                'Total Cost',
                `$${Object.values(estimates).reduce((acc, curr) => acc + curr.cost, 0).toLocaleString()}`,
                <AttachMoneyIcon color="primary" />,
                'primary.main'
              )}
            </Grid>
            <Grid item xs={12}>
              {renderMetricCard(
                'Total Hours',
                `${Object.values(estimates).reduce((acc, curr) => acc + curr.hours, 0).toLocaleString()} hrs`,
                <TimelineIcon color="secondary" />,
                'secondary.main'
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Detailed Breakdown */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Phase</TableCell>
                  <TableCell align="right">Hours</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Team Size</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(estimates).map(([phase, data]) => (
                  <TableRow key={phase}>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                        {phase}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {data.hours.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      ${data.cost.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {Math.ceil(data.hours / (projectParams.duration * 160))}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        size="small"
                        label={`${Math.ceil(data.hours / projectParams.duration)} hrs/month`}
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResourceEstimator
