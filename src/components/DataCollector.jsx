import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import FolderIcon from '@mui/icons-material/Folder'
import StorageIcon from '@mui/icons-material/Storage'

function DataCollector() {
  const [emailTemplates, setEmailTemplates] = useState([])
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [newTemplate, setNewTemplate] = useState({
    subject: '',
    body: '',
    variables: [],
    responseMapping: {}
  })

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setEmailTemplates(templates => 
        templates.map(t => 
          t.id === selectedTemplate.id ? { ...newTemplate, id: t.id } : t
        )
      )
    } else {
      setEmailTemplates(templates => [
        ...templates,
        { ...newTemplate, id: Date.now() }
      ])
    }
    setShowTemplateDialog(false)
    setNewTemplate({
      subject: '',
      body: '',
      variables: [],
      responseMapping: {}
    })
    setSelectedTemplate(null)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h6">
                Email Templates
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowTemplateDialog(true)}
              >
                New Template
              </Button>
            </Box>

            <List>
              {emailTemplates.map(template => (
                <ListItem
                  key={template.id}
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setSelectedTemplate(template)
                          setNewTemplate(template)
                          setShowTemplateDialog(true)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setEmailTemplates(templates =>
                            templates.filter(t => t.id !== template.id)
                          )
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={template.subject}
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        {template.variables.map(variable => (
                          <Chip
                            key={variable}
                            label={variable}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Data Storage
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Response Storage"
                  secondary="Store survey responses and collected data"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Analysis Results"
                  secondary="Store processed data and analysis results"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Template Dialog */}
      <Dialog
        open={showTemplateDialog}
        onClose={() => {
          setShowTemplateDialog(false)
          setSelectedTemplate(null)
          setNewTemplate({
            subject: '',
            body: '',
            variables: [],
            responseMapping: {}
          })
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTemplate ? 'Edit Template' : 'New Template'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Subject"
            value={newTemplate.subject}
            onChange={(e) => setNewTemplate({
              ...newTemplate,
              subject: e.target.value
            })}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Email Body"
            value={newTemplate.body}
            onChange={(e) => setNewTemplate({
              ...newTemplate,
              body: e.target.value
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Variables (comma-separated)"
            value={newTemplate.variables.join(', ')}
            onChange={(e) => setNewTemplate({
              ...newTemplate,
              variables: e.target.value.split(',').map(v => v.trim())
            })}
            helperText="Use {{variableName}} in the email body"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTemplateDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleSaveTemplate}
          >
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DataCollector
