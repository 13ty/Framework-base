import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Collapse,
  Chip,
  LinearProgress,
  Tooltip
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WorkIcon from '@mui/icons-material/Work'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

function InsightCard({ insight }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #2196f3, #21cbf3)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            {insight.title}
          </Typography>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              ml: 'auto',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<TrendingUpIcon />}
            label={`Impact: ${insight.impact}`}
            color="primary"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<WorkIcon />}
            label={`Effort: ${insight.effort}`}
            color="secondary"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`${insight.timeEstimate}`}
            variant="outlined"
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          {insight.summary}
        </Typography>

        <Collapse in={expanded}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Implementation Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinearProgress
                variant="determinate"
                value={insight.progress}
                sx={{ flexGrow: 1 }}
              />
              <Typography variant="caption">
                {insight.progress}%
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Key Points
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              {insight.keyPoints.map((point, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  {point}
                </Typography>
              ))}
            </Box>

            {insight.recommendations && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Recommendations
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {insight.recommendations.map((rec, index) => (
                    <Tooltip key={index} title={rec.description}>
                      <Chip
                        label={rec.title}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        onClick={() => {/* Handle recommendation click */}}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default InsightCard
