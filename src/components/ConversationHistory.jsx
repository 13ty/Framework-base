import React, { useState } from 'react'
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Box,
  IconButton
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { useSelector } from 'react-redux'

function ConversationHistory({ onSelectTurn }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const conversationHistory = useSelector(
    state => state.conversation.conversationHistory
  )

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <HistoryIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ 
          '& .MuiDrawer-paper': { 
            width: 400, 
            p: 2 
          } 
        }}
      >
        <Typography variant="h6" gutterBottom>
          Conversation History
        </Typography>
        <List>
          {conversationHistory.map((turn, index) => (
            <ListItem 
              key={index} 
              button 
              onClick={() => {
                onSelectTurn(turn)
                setDrawerOpen(false)
              }}
            >
              <ListItemText
                primary={`Turn ${index + 1}`}
                secondary={new Date(turn.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default ConversationHistory
