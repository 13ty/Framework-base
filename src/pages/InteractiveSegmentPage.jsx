import React, { useState } from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  Grid 
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import SegmentSelector from '../components/SegmentSelector'
import SelectedSegments from '../components/SelectedSegments'
import SegmentGenerationModal from '../components/SegmentGenerationModal'
import { generateNewSegments } from '../store/segmentSlice'

function InteractiveSegmentPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const availableSegments = useSelector(state => state.segments.availableSegments)

  const handleGenerateSegments = ({ category, prompt }) => {
    // Simulated LLM response generation
    const newSegments = [
      { 
        id: `${category}-${Date.now()}`, 
        description: `Generated segment based on prompt: ${prompt}` 
      }
    ]

    dispatch(generateNewSegments({ 
      category, 
      segments: newSegments 
    }))
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Interactive Segment Generation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {Object.entries(availableSegments).map(([category, segments]) => (
            <SegmentSelector 
              key={category}
              category={category} 
              segments={segments} 
            />
          ))}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setModalOpen(true)}
            sx={{ mt: 2 }}
          >
            Generate New Segments
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectedSegments />
        </Grid>
      </Grid>

      <SegmentGenerationModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGenerate={handleGenerateSegments}
      />
    </Container>
  )
}

export default InteractiveSegmentPage
