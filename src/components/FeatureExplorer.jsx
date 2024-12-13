import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Dialog,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'

function FeatureExplorer() {
  const [features, setFeatures] = useState([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    type: 'core',
    alternatives: [],
    implications: []
  })

  const featureTypes = {
    core: {
      icon: StarIcon,
      color: '#f44336'
    },
    innovative: {
      icon: NewReleasesIcon,
      color: '#2196f3'
    },
    enhancement: {
      icon: TrendingUpIcon,
      color: '#4caf50'
    },
    experimental: {
      icon: EmojiObjectsIcon,
      color: '#ff9800'
    }
  }

  const handleAddFeature = () => {
    setFeatures([...features, { ...newFeature, id: Date.now() }])
    setNewFeature({
      name: '',
      description: '',
      type: 'core',
      alternatives: [],
      implications: []
    })
    setShowAddDialog(false)
  }

  const handleAddAlternative = (featureId, alternative) => {
    setFeatures(features.map(feature => {
      if (feature.id === featureId) {
        return {
          ...feature,
          alternatives: [...feature.alternatives, alternative]
        }
      }
      return feature
    }))
  }

  const renderFeatureCard = (feature) => {
    const TypeIcon = featureTypes[feature.type].icon

    return (
      <Card 
        sx={{ 
          mb: 2,
          borderLeft: `4px solid ${featureTypes[feature.type].color}`
        }}
      >
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TypeIcon 
                sx={{ 
                  color: featureTypes[feature.type].color,
                  mr: 1
                }} 
              />
              <Typography variant="h6">
                {feature.name}
              </Typography>
            </Box>
            <IconButton
              onClick={() => setExpandedFeature(
                expandedFeature === feature.id ? null : feature.id
              )}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {feature.description}
          </Typography>

          <Collapse in={expandedFeature === feature.id}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Alternative Approaches
              </Typography>
              <List dense>
                {feature.alternatives.map((alt, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <LightbulbIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={alt} />
                  </ListItem>
                ))}
              </List>

              <TextField
                fullWidth
                size="small"
                placeholder="Add alternative approach"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddAlternative(feature.id, e.target.value.trim())
                    e.target.value = ''
                  }
                }}
                sx={{ mt: 1 }}
              />

              {feature.implications.length > 0 && (
                <>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ mt: 2 }}
                  >
                    Technical Implications
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {feature.implications.map((imp, index) => (
                      <Chip
                        key={index}
                        label={imp}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    )
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
          Feature Explorer
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
        >
          Add Feature
        </Button>
      </Box>

      <Grid container spacing={3}>
        {Object.entries(featureTypes).map(([type, { color }]) => (
          <Grid item xs={12} md={6} key={type}>
            <Paper sx={{ p: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  textTransform: 'capitalize',
                  color
                }}
              >
                {type} Features
              </Typography>
              {features
                .filter(f => f.type === type)
                .map(feature => renderFeatureCard(feature))}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add Feature Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Feature
          </Typography>

          <TextField
            fullWidth
            label="Feature Name"
            value={newFeature.name}
            onChange={(e) => setNewFeature({
              ...newFeature,
              name: e.target.value
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Feature Type"
            value={newFeature.type}
            onChange={(e) => setNewFeature({
              ...newFeature,
              type: e.target.value
            })}
            SelectProps={{
              native: true
            }}
            sx={{ mb: 2 }}
          >
            {Object.keys(featureTypes).map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={newFeature.description}
            onChange={(e) => setNewFeature({
              ...newFeature,
              description: e.target.value
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={2}
            label="Technical Implications (one per line)"
            value={newFeature.implications.join('\n')}
            onChange={(e) => setNewFeature({
              ...newFeature,
              implications: e.target.value.split('\n').filter(Boolean)
            })}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddFeature}
              disabled={!newFeature.name}
            >
              Add Feature
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default FeatureExplorer
