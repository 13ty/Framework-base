import React from 'react'
import {
  Paper,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function ResponseSegment({ segment, onAdd }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          boxShadow: 1
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <Typography variant="body1">
          {segment.content}
        </Typography>
        <IconButton 
          color="primary" 
          onClick={() => onAdd(segment)}
          sx={{ ml: 2 }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default ResponseSegment
