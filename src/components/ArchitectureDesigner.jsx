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
  Tooltip,
  Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ApiIcon from '@mui/icons-material/Api'
import StorageIcon from '@mui/icons-material/Storage'
import DevicesIcon from '@mui/icons-material/Devices'
import SecurityIcon from '@mui/icons-material/Security'
import CloudIcon from '@mui/icons-material/Cloud'
import LayersIcon from '@mui/icons-material/Layers'

function ArchitectureDesigner() {
  const [components, setComponents] = useState([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newComponent, setNewComponent] = useState({
    name: '',
    type: 'service',
    description: '',
    connections: []
  })

  const componentTypes = {
    service: {
      icon: ApiIcon,
      color: '#2196f3'
    },
    database: {
      icon: StorageIcon,
      color: '#4caf50'
    },
    frontend: {
      icon: DevicesIcon,
      color: '#ff9800'
    },
    security: {
      icon: SecurityIcon,
      color: '#f44336'
    },
    cloud: {
      icon: CloudIcon,
      color: '#9c27b0'
    },
    middleware: {
      icon: LayersIcon,
      color: '#795548'
    }
  }

  const handleAddComponent = () => {
    setComponents([...components, { ...newComponent, id: Date.now() }])
    setNewComponent({ name: '', type: 'service', description: '', connections: [] })
    setShowAddDialog(false)
  }

  const handleConnect = (sourceId, targetId) => {
    setComponents(components.map(comp => {
      if (comp.id === sourceId) {
        return {
          ...comp,
          connections: [...comp.connections, targetId]
        }
      }
      return comp
    }))
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
          Architecture Designer
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
        >
          Add Component
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Component Categories */}
        {Object.entries(componentTypes).map(([type, { icon: Icon, color }]) => (
          <Grid item xs={12} md={4} key={type}>
            <Paper 
              sx={{ 
                p: 2,
                borderTop: `4px solid ${color}`
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2
              }}>
                <Icon sx={{ color, mr: 1 }} />
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {type}s
                </Typography>
              </Box>
              
              {components
                .filter(comp => comp.type === type)
                .map(component => (
                  <Card 
                    key={component.id} 
                    sx={{ 
                      mb: 2,
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {component.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {component.description}
                      </Typography>
                      {component.connections.length > 0 && (
                        <>
                          <Divider sx={{ my: 1 }} />
                          <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap',
                            gap: 1 
                          }}>
                            {component.connections.map(connId => {
                              const connectedComp = components.find(
                                c => c.id === connId
                              )
                              return (
                                <Chip
                                  key={connId}
                                  label={connectedComp?.name}
                                  size="small"
                                  icon={<ArrowForwardIcon />}
                                />
                              )
                            })}
                          </Box>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add Component Dialog */}
      <Dialog 
        open={showAddDialog} 
        onClose={() => setShowAddDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Component
          </Typography>
          
          <TextField
            fullWidth
            label="Component Name"
            value={newComponent.name}
            onChange={(e) => setNewComponent({
              ...newComponent,
              name: e.target.value
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Component Type"
            value={newComponent.type}
            onChange={(e) => setNewComponent({
              ...newComponent,
              type: e.target.value
            })}
            SelectProps={{
              native: true
            }}
            sx={{ mb: 2 }}
          >
            {Object.keys(componentTypes).map(type => (
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
            value={newComponent.description}
            onChange={(e) => setNewComponent({
              ...newComponent,
              description: e.target.value
            })}
            sx={{ mb: 2 }}
          />

          {components.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Connect to:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {components.map(comp => (
                  <Chip
                    key={comp.id}
                    label={comp.name}
                    onClick={() => {
                      setNewComponent({
                        ...newComponent,
                        connections: [...newComponent.connections, comp.id]
                      })
                    }}
                    onDelete={
                      newComponent.connections.includes(comp.id)
                        ? () => {
                            setNewComponent({
                              ...newComponent,
                              connections: newComponent.connections.filter(
                                id => id !== comp.id
                              )
                            })
                          }
                        : undefined
                    }
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleAddComponent}
              disabled={!newComponent.name}
            >
              Add Component
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default ArchitectureDesigner
