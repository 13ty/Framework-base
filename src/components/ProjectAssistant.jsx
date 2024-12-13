import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  TextField,
  Chip,
  Autocomplete,
  IconButton,
  Tooltip,
  Dialog
} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import BuildIcon from '@mui/icons-material/Build'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import CodeIcon from '@mui/icons-material/Code'

const projectSteps = [
  {
    label: 'Project Scope',
    description: 'Define the core features and objectives',
    suggestedPrompts: [
      'What problem does this project solve?',
      'Who are the target users?',
      'What are the must-have features?'
    ]
  },
  {
    label: 'Architecture Planning',
    description: 'Design system architecture and tech stack',
    suggestedPrompts: [
      'What are the main system components?',
      'Which technologies best suit the requirements?',
      'How will the system scale?'
    ]
  },
  {
    label: 'Development Roadmap',
    description: 'Create development phases and milestones',
    suggestedPrompts: [
      'What are the development phases?',
      'What are the key milestones?',
      'How should features be prioritized?'
    ]
  },
  {
    label: 'Implementation Details',
    description: 'Break down technical implementation details',
    suggestedPrompts: [
      'What are the technical challenges?',
      'How should the database be structured?',
      'What APIs need to be developed?'
    ]
  }
]

function ProjectAssistant() {
  const [activeStep, setActiveStep] = useState(0)
  const [responses, setResponses] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handlePromptSelect = async (prompt) => {
    setIsGenerating(true)
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockResponse = `Generated response for: ${prompt}`
      setResponses({
        ...responses,
        [activeStep]: [...(responses[activeStep] || []), mockResponse]
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5">
            Project Development Assistant
          </Typography>
          <Tooltip title="Show Tips">
            <IconButton 
              sx={{ ml: 'auto' }}
              onClick={() => setShowTips(true)}
            >
              <TipsAndUpdatesIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Stepper activeStep={activeStep} orientation="vertical">
          {projectSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography color="text.secondary" paragraph>
                  {step.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Autocomplete
                    freeSolo
                    options={step.suggestedPrompts}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select or type a prompt"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    onChange={(_, value) => value && handlePromptSelect(value)}
                  />
                </Box>

                {responses[index]?.map((response, rIndex) => (
                  <Paper
                    key={rIndex}
                    variant="outlined"
                    sx={{ p: 2, mb: 2, backgroundColor: 'background.default' }}
                  >
                    <Typography variant="body2">
                      {response}
                    </Typography>
                  </Paper>
                ))}

                <Box sx={{ mb: 2, mt: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === projectSteps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Dialog
        open={showTips}
        onClose={() => setShowTips(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Development Tips
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip icon={<BuildIcon />} label="Start with MVP features" />
            <Chip icon={<ArchitectureIcon />} label="Plan for scalability" />
            <Chip icon={<CodeIcon />} label="Consider modularity" />
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            Follow these best practices for efficient project development:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" paragraph>
              Break down large features into smaller, manageable tasks
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Document architectural decisions and their rationale
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Consider security implications early in the development process
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Plan for testing and quality assurance from the start
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            onClick={() => setShowTips(false)}
            sx={{ mt: 2 }}
          >
            Got it
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
}

export default ProjectAssistant
