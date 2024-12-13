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
  Collapse,
  Rating,
  LinearProgress,
  Tooltip
} from '@mui/material'
import YouTubeIcon from '@mui/icons-material/YouTube'
import ForumIcon from '@mui/icons-material/Forum'
import ArticleIcon from '@mui/icons-material/Article'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import SchoolIcon from '@mui/icons-material/School'
import LinkIcon from '@mui/icons-material/Link'
import VerifiedIcon from '@mui/icons-material/Verified'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import TimelineIcon from '@mui/icons-material/Timeline'

function KnowledgeHarvester() {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [showTopicDialog, setShowTopicDialog] = useState(false)
  const [showSourceDialog, setShowSourceDialog] = useState(false)

  const sourceTypes = {
    video: {
      icon: YouTubeIcon,
      name: 'Video Content',
      platforms: ['YouTube', 'Vimeo', 'Educational Platforms']
    },
    forum: {
      icon: ForumIcon,
      name: 'Forum Discussions',
      platforms: ['Reddit', 'Stack Exchange', 'Specialized Forums']
    },
    article: {
      icon: ArticleIcon,
      name: 'Articles & Papers',
      platforms: ['Research Papers', 'Blog Posts', 'Technical Articles']
    },
    documentation: {
      icon: LocalLibraryIcon,
      name: 'Documentation',
      platforms: ['Official Docs', 'Wikis', 'Guides']
    }
  }

  const renderKnowledgeCard = (knowledge) => (
    <Card 
      sx={{ 
        mb: 2,
        position: 'relative',
        '&:hover': {
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {knowledge.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating 
                value={knowledge.relevance} 
                readOnly 
                size="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Relevance Score
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={<NewReleasesIcon />}
            label={knowledge.isNovel ? 'Novel Finding' : 'Known Info'}
            color={knowledge.isNovel ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Typography variant="body2" paragraph>
          {knowledge.summary}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Source Verification
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={knowledge.verificationScore} 
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {knowledge.verificationScore}% verified across sources
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {knowledge.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          {knowledge.sources.map((source, index) => (
            <Tooltip title={source.platform} key={index}>
              <IconButton size="small">
                {sourceTypes[source.type].icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </CardContent>
    </Card>
  )

  const renderTopicOverview = (topic) => (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5">
          {topic.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<AutoGraphIcon />}
            variant="outlined"
          >
            Analysis
          </Button>
          <Button
            startIcon={<SchoolIcon />}
            variant="contained"
          >
            Generate Learning Path
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Discoveries
            </Typography>
            {topic.knowledge.map((k, index) => renderKnowledgeCard(k))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Knowledge Map
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2 
            }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Coverage
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={topic.coverage} 
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {topic.coverage}% of subject area covered
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Novel Findings
                </Typography>
                <Typography variant="h4" color="primary">
                  {topic.novelFindings}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  unique discoveries
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Source Distribution
                </Typography>
                {Object.entries(topic.sourceDistribution).map(([source, percentage]) => (
                  <Box key={source} sx={{ mb: 1 }}>
                    <Typography variant="caption">
                      {source}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={percentage} 
                      sx={{ height: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Learning Pathways
            </Typography>
            <List dense>
              {topic.learningPaths?.map((path, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <TimelineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={path.name}
                    secondary={`${path.concepts.length} concepts`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5">
          Knowledge Harvester
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowTopicDialog(true)}
        >
          New Knowledge Topic
        </Button>
      </Box>

      {selectedTopic ? (
        renderTopicOverview(selectedTopic)
      ) : (
        <Grid container spacing={3}>
          {topics.map((topic) => (
            <Grid item xs={12} md={4} key={topic.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 }
                }}
                onClick={() => setSelectedTopic(topic)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {topic.name}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={topic.coverage} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {topic.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add dialogs for topic and source management */}
    </Box>
  )
}

export default KnowledgeHarvester
