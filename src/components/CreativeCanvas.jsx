import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  Chip
} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import DevicesIcon from '@mui/icons-material/Devices'

function CreativeCanvas({ ideas }) {
  const [hoveredIdea, setHoveredIdea] = useState(null)

  // Dynamic positioning for idea bubbles
  const calculatePosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI
    const radius = 150
    return {
      left: `${Math.cos(angle) * radius + 200}px`,
      top: `${Math.sin(angle) * radius + 200}px`
    }
  }

  return (
    <Paper
      sx={{
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        borderRadius: 4,
        p: 2
      }}
    >
      {/* Central hub */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
      >
        <IconButton
          sx={{
            width: 80,
            height: 80,
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          <BubbleChartIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>

      {/* Idea bubbles */}
      {ideas.map((idea, index) => (
        <Fade in key={idea.id}>
          <Box
            sx={{
              position: 'absolute',
              ...calculatePosition(index, ideas.length),
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                zIndex: 3
              }
            }}
            onMouseEnter={() => setHoveredIdea(idea.id)}
            onMouseLeave={() => setHoveredIdea(null)}
          >
            <Paper
              elevation={hoveredIdea === idea.id ? 8 : 2}
              sx={{
                p: 2,
                width: 180,
                height: 180,
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: hoveredIdea === idea.id
                  ? 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
                  : 'white',
                color: hoveredIdea === idea.id ? 'white' : 'inherit',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <IconButton
                sx={{
                  mb: 1,
                  color: hoveredIdea === idea.id ? 'white' : 'primary.main'
                }}
              >
                {idea.type === 'feature' ? <LightbulbIcon /> :
                 idea.type === 'architecture' ? <AccountTreeIcon /> :
                 <DevicesIcon />}
              </IconButton>
              <Typography variant="subtitle1" gutterBottom>
                {idea.title}
              </Typography>
              <Chip
                label={idea.type}
                size="small"
                sx={{
                  backgroundColor: hoveredIdea === idea.id ? 'rgba(255,255,255,0.2)' : 'primary.light',
                  color: hoveredIdea === idea.id ? 'white' : 'primary.main'
                }}
              />
            </Paper>
          </Box>
        </Fade>
      ))}

      {/* Connection lines */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {ideas.map((_, index) => {
          const pos = calculatePosition(index, ideas.length)
          return (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={pos.left}
              y2={pos.top}
              stroke="#e0e0e0"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          )
        })}
      </svg>
    </Paper>
  )
}

export default CreativeCanvas
