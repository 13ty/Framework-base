import React, { useState } from 'react'
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import TopNavbar from '../components/TopNavbar'
import SettingsPanel from '../components/SettingsPanel'
import IdeaWorkspace from '../components/IdeaWorkspace'
import ProjectPanel from '../components/ProjectPanel'

const DRAWER_WIDTH = 300

function MainLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopNavbar 
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMenuClick={() => setIsProjectPanelOpen(true)}
      />
      
      {/* Project Panel Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={isProjectPanelOpen}
        onClose={() => setIsProjectPanelOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider'
          }
        }}
      >
        <ProjectPanel />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          mt: '64px'
        }}
      >
        <IdeaWorkspace />
      </Box>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
      </Drawer>
    </Box>
  )
}

export default MainLayout
