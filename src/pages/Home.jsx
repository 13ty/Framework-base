import React from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardActions,
  Box 
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const navigate = useNavigate()
  const projectConcepts = useSelector(state => state.conversation.projectConcepts)

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          AI App Idea Generator
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Transform your app ideas into structured concepts with AI assistance
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/generate')}
          sx={{ mt: 2 }}
        >
          Start New Project
        </Button>
      </Box>

      {projectConcepts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Recent Projects
          </Typography>
          <Grid container spacing={3}>
            {projectConcepts.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description || 'No description'}
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  )
}

export default Home
