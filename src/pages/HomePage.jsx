import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import MenuBookIcon from '@mui/icons-material/MenuBook'

function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Idea Workspace',
      description: 'Generate and develop your app ideas with AI assistance',
      icon: CreateIcon,
      path: '/workspace'
    },
    {
      title: 'Interactive Notebook',
      description: 'Document and organize your ideas in rich format',
      icon: MenuBookIcon,
      path: '/notebook'
    },
    {
      title: 'Concept Viewer',
      description: 'View and explore project concepts',
      icon: AutoAwesomeIcon,
      path: '/concept'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          AI App Idea Generator
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Transform your ideas into well-structured app concepts
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2 
                }}>
                  <feature.icon 
                    color="primary" 
                    sx={{ mr: 1, fontSize: 30 }} 
                  />
                  <Typography variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  onClick={() => navigate(feature.path)}
                >
                  Open
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomePage
