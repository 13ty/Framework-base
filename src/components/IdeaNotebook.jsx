import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CodeIcon from '@mui/icons-material/Code'
import ImageIcon from '@mui/icons-material/Image'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TableChartIcon from '@mui/icons-material/TableChart'
import BrushIcon from '@mui/icons-material/Brush'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SaveIcon from '@mui/icons-material/Save'
import ShareIcon from '@mui/icons-material/Share'
import DownloadIcon from '@mui/icons-material/Download'

function IdeaNotebook() {
  const [cells, setCells] = useState([])
  const [activeCell, setActiveCell] = useState(null)
  const [showCellDialog, setShowCellDialog] = useState(false)
  const [cellType, setCellType] = useState('markdown')

  const cellTypes = {
    markdown: {
      icon: TextFieldsIcon,
      name: 'Text & Notes',
      description: 'Add formatted text, lists, and links'
    },
    code: {
      icon: CodeIcon,
      name: 'Code Cell',
      description: 'Add Python code for data analysis'
    },
    drawing: {
      icon: BrushIcon,
      name: 'Sketch & Draw',
      description: 'Create diagrams and sketches'
    },
    data: {
      icon: TableChartIcon,
      name: 'Data Table',
      description: 'Add structured data'
    },
    image: {
      icon: ImageIcon,
      name: 'Image',
      description: 'Add images and screenshots'
    }
  }

  const renderCell = (cell) => {
    const CellIcon = cellTypes[cell.type].icon

    return (
      <Paper 
        sx={{ 
          p: 2, 
          mb: 2,
          border: '1px solid',
          borderColor: activeCell === cell.id ? 'primary.main' : 'divider',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 2
          }
        }}
        onClick={() => setActiveCell(cell.id)}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 1
        }}>
          <CellIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle2">
            {cellTypes[cell.type].name}
          </Typography>
          {cell.type === 'code' && (
            <Tooltip title="Run Code">
              <IconButton size="small" sx={{ ml: 'auto' }}>
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {cell.type === 'markdown' && (
          <Typography variant="body1">
            {cell.content}
          </Typography>
        )}

        {cell.type === 'code' && (
          <Box 
            sx={{ 
              bgcolor: 'grey.900',
              color: 'grey.100',
              p: 2,
              borderRadius: 1,
              fontFamily: 'monospace'
            }}
          >
            <pre style={{ margin: 0 }}>
              {cell.content}
            </pre>
          </Box>
        )}

        {cell.type === 'drawing' && (
          <Box 
            sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 1
            }}
          >
            <img 
              src={cell.content} 
              alt="Drawing" 
              style={{ maxWidth: '100%' }}
            />
          </Box>
        )}

        {cell.type === 'data' && (
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              {/* Render data table */}
            </table>
          </Box>
        )}
      </Paper>
    )
  }

  const handleAddCell = (type) => {
    const newCell = {
      id: Date.now(),
      type,
      content: '',
      metadata: {}
    }
    setCells([...cells, newCell])
    setActiveCell(newCell.id)
    setShowCellDialog(false)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5">
          Interactive Idea Notebook
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {/* Notebook Cells */}
          <Paper sx={{ p: 2 }}>
            {cells.map((cell) => renderCell(cell))}
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowCellDialog(true)}
              sx={{ mt: 2 }}
            >
              Add Cell
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          {/* Cell Properties */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Properties
            </Typography>
            {activeCell && (
              <Box>
                <TextField
                  fullWidth
                  label="Title"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Idea" size="small" />
                    <Chip label="Draft" size="small" />
                    <Chip 
                      icon={<AddIcon />}
                      label="Add Tag"
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Add Cell Dialog */}
      <Dialog
        open={showCellDialog}
        onClose={() => setShowCellDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Cell
          </Typography>
          
          <Grid container spacing={2}>
            {Object.entries(cellTypes).map(([type, info]) => (
              <Grid item xs={12} sm={6} key={type}>
                <Card
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 3 }
                  }}
                  onClick={() => handleAddCell(type)}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <info.icon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        {info.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </Box>
  )
}

export default IdeaNotebook
