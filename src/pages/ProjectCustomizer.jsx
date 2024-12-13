import React, { useState } from 'react'
import { 
  Container, 
  Typography, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button 
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setProjectDetails } from '../store/ideaSlice'

function ProjectCustomizer() {
  const [targetAudience, setTargetAudience] = useState('')
  const [coreFunctionality, setCoreFunctionality] = useState('')
  const dispatch = useDispatch()

  const handleCustomize = () => {
    dispatch(setProjectDetails({
      targetAudience,
      coreFunctionality
    }))
    // TODO: Trigger AI refinement
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Customize Your Project
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Target Audience</InputLabel>
            <Select
              value={targetAudience}
              label="Target Audience"
              onChange={(e) => setTargetAudience(e.target.value)}
            >
              <MenuItem value="general">General Public</MenuItem>
              <MenuItem value="healthcare">Healthcare</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="education">Education</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Core Functionality</InputLabel>
            <Select
              value={coreFunctionality}
              label="Core Functionality"
              onChange={(e) => setCoreFunctionality(e.target.value)}
            >
              <MenuItem value="ecommerce">E-commerce</MenuItem>
              <MenuItem value="social">Social Networking</MenuItem>
              <MenuItem value="cms">Content Management</MenuItem>
              <MenuItem value="analytics">Data Analysis</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCustomize}
          >
            Refine Project Idea
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProjectCustomizer
