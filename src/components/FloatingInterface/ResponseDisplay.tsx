import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Chip,
  Fade 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ResponseSegment } from '../../types';

const SegmentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: '400px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const SegmentCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateX(4px)',
    borderColor: theme.palette.primary.main,
    '& .add-button': {
      opacity: 1,
    },
  },
}));

interface ResponseDisplayProps {
  segments: ResponseSegment[];
  onAddSegment: (segment: ResponseSegment) => void;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ 
  segments, 
  onAddSegment 
}) => {
  return (
    <SegmentWrapper>
      {segments.map((segment, index) => (
        <Fade 
          key={segment.id} 
          in={true} 
          timeout={300} 
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <SegmentCard>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start' 
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">
                  {segment.content}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
                  <Chip 
                    label={segment.type}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  {segment.metadata?.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
              <IconButton
                className="add-button"
                size="small"
                onClick={() => onAddSegment(segment)}
                sx={{ 
                  opacity: 0,
                  transition: 'opacity 0.2s'
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </SegmentCard>
        </Fade>
      ))}
    </SegmentWrapper>
  );
};

export default ResponseDisplay;
```
