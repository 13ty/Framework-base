import React from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  Chip
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

function ResponseList({ responses }) {
  if (!responses.length) {
    return null
  }

  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Generated Ideas
      </Typography>
      <List>
        {responses.map((response) => (
          <ListItem
            key={response.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
              '&:last-child': { mb: 0 }
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip 
                  label={response.type} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
              </Box>
              <Typography variant="body1">
                {response.content}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small">
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton size="small" color="primary">
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default ResponseList
