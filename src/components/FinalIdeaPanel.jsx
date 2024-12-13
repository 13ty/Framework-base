import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SaveIcon from '@mui/icons-material/Save'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CategoryIcon from '@mui/icons-material/Category'
import TimelineIcon from '@mui/icons-material/Timeline'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

function FinalIdeaPanel() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    'all',
    'core-features',
    'ui-design',
    'architecture',
    'integrations'
  ]

  const priorities = ['High', 'Medium', 'Low']

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs for different views */}
      <Tabs 
        value={activeTab} 
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab 
          icon={<FormatListBulletedIcon />} 
          label="Ideas" 
        />
        <Tab 
          icon={<TimelineIcon />} 
          label="Roadmap" 
        />
        <Tab 
          icon={<CategoryIcon />} 
          label="Categories" 
        />
      </Tabs>

      {/* Ideas Tab */}
      {activeTab === 0 && (
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          {/* Category Filter */}
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category.replace('-', ' ')}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          {/* Ideas List */}
          <List>
            {/* Example items - replace with actual data */}
            <ListItem>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>User Authentication System</Typography>
                    <Chip 
                      label="High" 
                      size="small" 
                      color="error" 
                      variant="outlined" 
                    />
                  </Box>
                }
                secondary="Implement secure login system with OAuth"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
      )}

      {/* Roadmap Tab */}
      {activeTab === 1 && (
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          {/* Development Phases */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Phase 1: MVP Features</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {/* Example MVP features */}
                <ListItem>
                  <ListItemText 
                    primary="Core Authentication"
                    secondary="Estimated: 1 week"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Phase 2: Enhanced Features</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {/* Example enhanced features */}
                <ListItem>
                  <ListItemText 
                    primary="Social Integration"
                    secondary="Estimated: 2 weeks"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Categories Tab */}
      {activeTab === 2 && (
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          {categories.slice(1).map((category) => (
            <Accordion key={category}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {category.replace('-', ' ')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {/* Example categorized items */}
                  <ListItem>
                    <ListItemText 
                      primary="Example Feature"
                      secondary="Feature description"
                    />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        display: 'flex',
        gap: 1
      }}>
        <Button
          variant="outlined"
          startIcon={<ImportExportIcon />}
          sx={{ flex: 1 }}
        >
          Export
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ flex: 1 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default FinalIdeaPanel
