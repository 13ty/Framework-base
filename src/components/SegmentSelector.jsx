import React, { useState } from 'react'
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Tooltip 
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedSegment, editSegment } from '../store/segmentSlice'

function SegmentSelector({ segments, category }) {
  const dispatch = useDispatch()
  const selectedSegments = useSelector(state => state.segments.selectedSegments)

  const handleAddSegment = (segment) => {
    dispatch(addSelectedSegment({ 
      category, 
      segment 
    }))
  }

  const handleEditSegment = (segment) => {
    dispatch(editSegment({ 
      category, 
      segment 
    }))
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {category} Segments
      </Typography>
      <Grid container spacing={2}>
        {segments.map((segment, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              variant="outlined"
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <CardContent>
                <Typography variant="body1">
                  {segment.description}
                </Typography>
              </CardContent>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: 10, 
                  display: 'flex' 
                }}
              >
                <Tooltip title="Add Segment">
                  <IconButton 
                    color="primary" 
                    onClick={() => handleAddSegment(segment)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Segment">
                  <IconButton 
                    color="secondary" 
                    onClick={() => handleEditSegment(segment)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SegmentSelector
