import React from 'react'
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid 
} from '@mui/material'
import { useSelector } from 'react-redux'

function AIResponseView() {
  const aiResponse = useSelector(state => state.idea.aiResponse)

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        AI Generated Suggestions
      </Typography>
      {aiResponse ? (
        <Grid container spacing={3}>
          {aiResponse.suggestions.map((suggestion, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{suggestion.title}</Typography>
                  <Typography variant="body2">{suggestion.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          No AI suggestions generated yet. Please start by creating a project idea.
        </Typography>
      )}
    </Container>
  )
}

export default AIResponseView
