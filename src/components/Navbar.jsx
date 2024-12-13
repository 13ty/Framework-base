import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI App Idea Generator
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/generate">Generate Idea</Button>
        <Button color="inherit" component={Link} to="/customize">Customize</Button>
        <Button color="inherit" component={Link} to="/interactive-segments">
          Interactive Segments
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
