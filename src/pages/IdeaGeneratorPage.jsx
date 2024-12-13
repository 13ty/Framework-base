import React, { useState } from 'react'
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  IconButton,
  Tooltip,
  Divider,
  Paper
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import QueryInput from '../components/QueryInput'
import ModelSelector from '../components/ModelSelector'
import IdeaTile from '../components/IdeaTile'
import FinalIdeaSection from '../components/FinalIdeaSection'
import WordCountTracker from '../components/WordCountTracker'
import ConversationHistory from '../components/ConversationHistory'
import LLMConfigModal from '../components/LLMConfigModal'
import { useDispatch, useSelector } from 'react-redux'
import { 
  startWordCountTracking, 
  updateWordCount 
} from '../store/llmConfigSlice'
import { 
  addConversationTurn,
  addProjectElement,
  updateCurrentProjectConcept,
  saveCurrentProjectConcept,
  removeProjectElement
} from '../store/conversationSlice'

function IdeaGeneratorPage() {
  // ... (state and other logic remains the same)

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3} sx={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}> {/* Added height and overflow */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> {/* Sidebar */}
          <Box>
            <ModelSelector />
          </Box>
          <Box sx={{ flexGrow: 1 }}> {/* Placeholder for future features */}
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Future Feature Placeholder
              </Typography>
              {/* Content for future features */}
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}> {/* Main content */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <Typography variant="h4" gutterBottom>
                Generate App Ideas
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WordCountTracker />
                <ConversationHistory onSelectTurn={handleSelectConversationTurn} />
                <Tooltip title="LLM Configuration">
                  <IconButton onClick={() => setConfigModalOpen(true)}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <QueryInput onGenerateIdeas={handleGenerateIdeas} />
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ flexGrow: 1, overflow: 'auto' }}> {/* Added flexGrow and overflow */}
            {generatedIdeas.length > 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Generated Ideas
                </Typography>
                <Grid container spacing={3}>
                  {generatedIdeas.map((idea) => (
                    <Grid item xs={12} md={6} key={idea.id}>
                      <IdeaTile
                        idea={idea}
                        onAdd={handleAddProjectElement}
                        onEdit={(editedIdea) => {
                          const updatedIdeas = generatedIdeas.map(
                            idea => (idea.id === editedIdea.id ? editedIdea : idea)
                          )
                          setGeneratedIdeas(updatedIdeas)
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>

          <Box sx={{ mt: 4, position: 'sticky', bottom: 0, bgcolor: 'background.paper', p: 2, zIndex: 10 }}> {/* Final Idea Section */}
            <FinalIdeaSection
              finalIdeas={currentProjectConcept.elements}
              onRemoveIdea={(id) => {
                dispatch(removeProjectElement(id))
              }}
            />
          </Box>
        </Grid>

        <LLMConfigModal 
          open={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
        />
      </Grid>
    </Container>
  )
}

export default IdeaGeneratorPage
