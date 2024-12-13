import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import TopNavbar from './components/TopNavbar'
import HomePage from './pages/HomePage'
import IdeaWorkspace from './pages/IdeaWorkspace'
import IdeaNotebook from './components/IdeaNotebook'
import ConceptViewer from './components/ConceptViewer'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNavbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '64px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<IdeaWorkspace />} />
          <Route path="/notebook" element={<IdeaNotebook />} />
          <Route path="/concept" element={<ConceptViewer />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
