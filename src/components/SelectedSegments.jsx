import React from 'react'
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton 
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { removeSelectedSegment } from '../store/segmentSlice'

function SelectedSegments() {
  const dispatch = useDispatch()
  const selectedSegments = useSelector(state => state.segments.selectedSegments)

  const handleRemoveSegment = (category, segmentId) => {
    dispatch(removeSelectedSegment({ category, segmentId }))
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Selected Segments
      </Typography>
      {Object.entries(selectedSegments).map(([category, segments]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography variant="h6">{category}</Typography>
          <List>
            {segments.map((segment, index) => (
              <ListItem 
                key={index}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    onClick={() => handleRemoveSegment(category, segment.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={segment.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  )
}

export default SelectedSegments
