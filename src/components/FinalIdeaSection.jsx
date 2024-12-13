import React from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Tooltip 
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useDispatch } from 'react-redux'
import { addToFavorites } from '../store/historySlice'

function FinalIdeaSection({ 
  finalIdeas, 
  onRemoveIdea, 
  onExport 
}) {
  const dispatch = useDispatch()

  const handleExport = () => {
    // Export final ideas to JSON
    const exportData = {
      timestamp: new Date().toISOString(),
      ideas: finalIdeas
    }
    
    // Create downloadable JSON file
    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    
    // Create download link
    const link = document.createElement('a')
    link.href = href
    link.download = 'app_concept.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Optional: Save to favorites
    dispatch(addToFavorites({ 
      id: Date.now().toString(),
      ideas: finalIdeas 
    }))
  }

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="h6">
            Final App Concept
          </Typography>
          {finalIdeas.length > 0 && (
            <Tooltip title="Export Concept">
              <IconButton 
                color="primary" 
                onClick={handleExport}
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {finalIdeas.length === 0 ? (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Selected ideas will appear here
          </Typography>
        ) : (
          finalIdeas.map((idea, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 1,
                p: 1,
                bgcolor: 'background.default',
                borderRadius: 1
              }}
            >
              <Typography variant="body2">
                {idea.description}
              </Typography>
              <Tooltip title="Remove Idea">
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={() => onRemoveIdea(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default FinalIdeaSection
