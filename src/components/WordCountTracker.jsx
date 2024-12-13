import React from 'react'
import { Box, Typography, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'

function WordCountTracker() {
  const { startTime, endTime, wordCount } = useSelector(
    state => state.llmConfig.wordCountTracking
  )

  const calculateWordsPerMinute = () => {
    if (!startTime || !endTime) return 0
    
    const durationMinutes = (endTime - startTime) / (1000 * 60)
    return durationMinutes > 0 
      ? Math.round(wordCount / durationMinutes) 
      : wordCount
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        bgcolor: 'background.paper',
        p: 1,
        borderRadius: 2
      }}
    >
      <Tooltip title="Words generated per minute by LLM">
        <Typography variant="body2">
          WPM: {calculateWordsPerMinute()}
        </Typography>
      </Tooltip>
      <Tooltip title="Total words in LLM response">
        <Typography variant="body2">
          Words: {wordCount}
        </Typography>
      </Tooltip>
    </Box>
  )
}

export default WordCountTracker
