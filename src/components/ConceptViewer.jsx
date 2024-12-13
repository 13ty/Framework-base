import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Tooltip
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import ShareIcon from '@mui/icons-material/Share'
import { conceptNotebook } from '../data/conceptNotebook'
import { exportToJupyter } from '../utils/notebookExporter'

function ConceptViewer() {
  const [activeCell, setActiveCell] = useState(null)

  const handleExport = () => {
    const notebookJson = exportToJupyter(conceptNotebook.cells)
    const blob = new Blob([notebookJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-app-idea-generator-concept.ipynb'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4">
          {conceptNotebook.metadata.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export to Jupyter
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        {conceptNotebook.cells.map((cell) => (
          <Box 
            key={cell.id}
            sx={{ 
              mb: 3,
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            {/* Render different cell types */}
            {cell.type === 'markdown' && (
              <Typography 
                dangerouslySetInnerHTML={{ __html: cell.content }}
              />
            )}

            {cell.type === 'code' && (
              <Box 
                sx={{ 
                  bgcolor: 'grey.900',
                  color: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  overflow: 'auto'
                }}
              >
                <pre style={{ margin: 0 }}>
                  {cell.content}
                </pre>
              </Box>
            )}

            {cell.type === 'data' && (
              <Box>
                {/* Render data visualizations based on content type */}
                {cell.content.type === 'timeline' && (
                  // Render timeline visualization
                  <Box>Timeline Visualization</Box>
                )}
                {cell.content.type === 'dashboard' && (
                  // Render dashboard
                  <Box>Dashboard Visualization</Box>
                )}
                {cell.content.columns && (
                  // Render data table
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {cell.content.columns.map((col, i) => (
                          <th key={i} style={{ 
                            padding: '8px', 
                            borderBottom: '2px solid #ddd',
                            textAlign: 'left'
                          }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cell.content.data.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} style={{ 
                              padding: '8px', 
                              borderBottom: '1px solid #ddd' 
                            }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Box>
            )}

            {cell.metadata?.title && (
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ display: 'block', mt: 1 }}
              >
                {cell.metadata.title}
              </Typography>
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  )
}

export default ConceptViewer
