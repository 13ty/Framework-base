import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Idea, IdeaWorkspaceProps } from './types';
import IdeaCard from './IdeaCard';
import IdeaForm from './IdeaForm';

const IdeaWorkspace: React.FC<IdeaWorkspaceProps> = ({
  onIdeaCreate,
  onIdeaUpdate,
  onIdeaDelete
}) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const handleCreateIdea = (newIdea: Omit<Idea, 'id' | 'created' | 'updated'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      created: new Date(),
      updated: new Date()
    };
    
    setIdeas([...ideas, idea]);
    onIdeaCreate?.(idea);
    setShowForm(false);
  };

  const handleUpdateIdea = (id: string, updatedIdea: Partial<Idea>) => {
    const updated = ideas.map(idea => 
      idea.id === id 
        ? { ...idea, ...updatedIdea, updated: new Date() }
        : idea
    );
    setIdeas(updated);
    onIdeaUpdate?.(id, updated.find(i => i.id === id) as Idea);
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
    onIdeaDelete?.(id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          Idea Workspace
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          New Idea
        </Button>
      </Box>

      <Grid container spacing={3}>
        {ideas.map((idea) => (
          <Grid item xs={12} md={4} key={idea.id}>
            <IdeaCard
              idea={idea}
              onUpdate={(updates) => handleUpdateIdea(idea.id, updates)}
              onDelete={() => handleDeleteIdea(idea.id)}
              onEdit={() => setSelectedIdea(idea)}
            />
          </Grid>
        ))}
      </Grid>

      <IdeaForm
        open={showForm || !!selectedIdea}
        onClose={() => {
          setShowForm(false);
          setSelectedIdea(null);
        }}
        onSubmit={selectedIdea 
          ? (updates) => handleUpdateIdea(selectedIdea.id, updates)
          : handleCreateIdea
        }
        initialData={selectedIdea || undefined}
      />
    </Container>
  );
};

export default IdeaWorkspace;
