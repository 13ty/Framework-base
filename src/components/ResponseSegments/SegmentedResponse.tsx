import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Fade
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Segment } from './types';

interface SegmentedResponseProps {
  segments: Segment[];
  onAddToPlan: (segment: Segment) => void;
}

const SegmentedResponse: React.FC<SegmentedResponseProps> = ({
  segments,
  onAddToPlan
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {segments.map((segment, index) => (
        <Fade in key={segment.id} timeout={300} style={{ 
          transitionDelay: `${index * 100}ms` 
        }}>
          <Paper
            sx={{
              p: 2,
              position: 'relative',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
                '& .add-button': {
                  opacity: 1
                }
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip 
                    label={segment.type}
                    size="small"
                    color="primary"
                  />
                  {segment.priority && (
                    <Chip
                      label={segment.priority}
                      size="small"
                      color={
                        segment.priority === 'high' ? 'error' :
                        segment.priority === 'medium' ? 'warning' :
                        'default'
                      }
                    />
                  )}
                </Box>
                <Typography variant="body1">
                  {segment.content}
                </Typography>
                {segment.metadata?.tags && (
                  <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {segment.metadata.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Tooltip title="Add to Plan">
                <IconButton
                  className="add-button"
                  onClick={() => onAddToPlan(segment)}
                  sx={{
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    ml: 1
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        </Fade>
      ))}
    </Box>
  );
};

export default SegmentedResponse;
