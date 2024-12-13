import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Dialog,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@mui/material'
import ScienceIcon from '@mui/icons-material/Science'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import WebhookIcon from '@mui/icons-material/Webhook'
import CodeIcon from '@mui/icons-material/Code'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SearchIcon from '@mui/icons-material/Search'
import NotebookIcon from '@mui/icons-material/Book'
import UpdateIcon from '@mui/icons-material/Update'

function JupyterKnowledgeHub() {
  const [notebooks, setNotebooks] = useState([])
  const [webhooks, setWebhooks] = useState([])
  const [showNotebookDialog, setShowNotebookDialog] = useState(false)
  const [showWebhookDialog, setShowWebhookDialog] = useState(false)

  const notebookTypes = {
    research: {
      name: 'Research Curator',
      description: 'Curate and analyze academic papers',
      template: `
        {
          "cells": [
            {
              "cell_type": "markdown",
              "source": ["# Research Curation Pipeline\\n", "Automated research paper analysis and ranking"]
            },
            {
              "cell_type": "code",
              "source": [
                "import scholarly\\n",
                "import pandas as pd\\n",
                "# Custom ranking algorithm implementation"
              ]
            }
          ]
        }
      `
    },
    aiNews: {
      name: 'AI News Tracker',
      description: 'Track and analyze AI developments',
      template: `
        {
          "cells": [
            {
              "cell_type": "markdown",
              "source": ["# AI News Analysis\\n", "Automated news collection and analysis"]
            },
            {
              "cell_type": "code",
              "source": [
                "import feedparser\\n",
                "import nltk\\n",
                "# News processing pipeline"
              ]
            }
          ]
        }
      `
    },
    discovery: {
      name: 'Knowledge Discovery',
      description: 'Find rare and valuable information',
      template: `
        {
          "cells": [
            {
              "cell_type": "markdown",
              "source": ["# Knowledge Discovery Pipeline\\n", "Find rare and valuable information"]
            },
            {
              "cell_type": "code",
              "source": [
                "import requests\\n",
                "import beautifulsoup4\\n",
                "# Custom discovery algorithms"
              ]
            }
          ]
        }
      `
    }
  }

  const renderNotebookCard = (notebook) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <Box>
            <Typography variant="h6">
              {notebook.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date(notebook.lastRun).toLocaleString()}
            </Typography>
          </Box>
          <Chip
            icon={<AutoGraphIcon />}
            label={`${notebook.discoveryRate}% Novel`}
            color="primary"
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Discovery Pipeline
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={notebook.progress} 
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {notebook.processedSources} sources processed
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Ranking Formula
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={notebook.rankingFormula}
            InputProps={{
              readOnly: true,
              startAdornment: <CodeIcon color="primary" sx={{ mr: 1 }} />
            }}
          />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<UpdateIcon />}
            variant="outlined"
          >
            Update
          </Button>
          <Button
            size="small"
            startIcon={<SearchIcon />}
            variant="outlined"
          >
            View Results
          </Button>
        </Box>
      </CardContent>
    </Card>
  )

  const renderWebhookConfig = (webhook) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">
            {webhook.name}
          </Typography>
          <Chip
            icon={<WebhookIcon />}
            label={webhook.status}
            color={webhook.status === 'active' ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Trigger Conditions
          </Typography>
          <List dense>
            {webhook.triggers.map((trigger, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FilterAltIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={trigger.condition}
                  secondary={trigger.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Actions
          </Typography>
          <List dense>
            {webhook.actions.map((action, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <NotebookIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary={action.type}
                  secondary={action.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h5">
                Jupyter Knowledge Pipelines
              </Typography>
              <Button
                variant="contained"
                startIcon={<ScienceIcon />}
                onClick={() => setShowNotebookDialog(true)}
              >
                New Pipeline
              </Button>
            </Box>

            {notebooks.map((notebook) => renderNotebookCard(notebook))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6">
                Webhooks
              </Typography>
              <Button
                variant="outlined"
                startIcon={<WebhookIcon />}
                onClick={() => setShowWebhookDialog(true)}
              >
                Add Webhook
              </Button>
            </Box>

            {webhooks.map((webhook) => renderWebhookConfig(webhook))}
          </Paper>
        </Grid>
      </Grid>

      {/* Add dialogs for notebook and webhook configuration */}
    </Box>
  )
}

export default JupyterKnowledgeHub
