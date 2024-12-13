import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function IdeaTile({ 
  idea, 
  onAdd, 
  onEdit 
}) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editedIdea, setEditedIdea] = useState(idea)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleSaveEdit = () => {
    onEdit(editedIdea)
    setEditModalOpen(false)
  }

  return (
    <>
      <Card 
        elevation={3}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6
          },
          minHeight: '200px'
        }}
      >
        <CardContent sx={{ 
          flexGrow: 1, 
          p: 3,
          '&:last-child': { pb: 3 }
        }}>
          <Typography 
            variant="body1"
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.6,
              mb: 2
            }}
          >
            {idea.description}
          </Typography>
          
          <Box sx={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16,
            display: 'flex',
            gap: 1
          }}>
            <Tooltip title="Mark as Favorite">
              <IconButton 
                color="secondary" 
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Idea">
              <IconButton 
                color="primary" 
                onClick={() => setEditModalOpen(true)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to Project">
              <IconButton 
                color="success" 
                onClick={() => onAdd(idea)}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      <Dialog 
        open={editModalOpen} 
        onClose={() => setEditModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Idea</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={editedIdea.description}
            onChange={(e) => setEditedIdea({
              ...editedIdea,
              description: e.target.value
            })}
            sx={{ 
              mt: 2,
              '& .MuiInputBase-root': {
                fontSize: '1.1rem',
                lineHeight: 1.6
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained" 
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default IdeaTile
