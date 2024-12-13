```typescript
import React, { useState, useEffect } from 'react';
import { Box, Paper, IconButton, Tooltip, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import Draggable from 'react-draggable';
import MinimizeIcon from '@mui/icons-material/RemoveRounded';
import MaximizeIcon from '@mui/icons-material/AddRounded';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  }
}));

const DragHandle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  cursor: 'move',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '500px',
  maxHeight: '80vh',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
}));

interface FloatingContainerProps {
  children: React.ReactNode;
  onSettingsOpen?: () => void;
}

export const FloatingContainer: React.FC<FloatingContainerProps> = ({
  children,
  onSettingsOpen
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);

  // Load saved position
  useEffect(() => {
    const savedPosition = localStorage.getItem('appPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  // Save position
  const handleDragStop = (e: any, data: any) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem('appPosition', JSON.stringify(newPosition));
    setTimeout(() => setIsDragging(false), 100);
  };

  return (
    <Draggable
      handle=".drag-handle"
      position={position}
      onStart={() => setIsDragging(true)}
      onStop={handleDragStop}
      bounds="parent"
    >
      <StyledPaper
        elevation={3}
        sx={{
          transform: 'translate3d(0,0,0)', // Force GPU acceleration
          zIndex: 9999,
        }}
      >
        <DragHandle className="drag-handle">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DragHandleIcon 
              sx={{ 
                fontSize: 20, 
                color: 'text.secondary',
                opacity: 0.5 
              }} 
            />
            <Tooltip title="Settings">
              <IconButton
                size="small"
                onClick={onSettingsOpen}
                sx={{ opacity: 0.7 }}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title={isMinimized ? "Expand" : "Minimize"}>
            <IconButton
              size="small"
              onClick={() => setIsMinimized(!isMinimized)}
              sx={{ opacity: 0.7 }}
            >
              {isMinimized ? (
                <MaximizeIcon fontSize="small" />
              ) : (
                <MinimizeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </DragHandle>

        <Fade in={!isMinimized}>
          <ContentWrapper
            sx={{
              height: isMinimized ? 0 : 'auto',
              opacity: isMinimized ? 0 : 1,
            }}
          >
            {children}
          </ContentWrapper>
        </Fade>
      </StyledPaper>
    </Draggable>
  );
};

export default FloatingContainer;
```
