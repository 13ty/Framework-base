import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  CircularProgress
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'

function ExportDialog({ open, onClose, projectData }) {
  const [format, setFormat] = useState('json')
  const [sections, setSections] = useState({
    ideas: true,
    roadmap: true,
    technical: true,
    design: true
  })
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      let exportData = {}
      
      if (sections.ideas) {
        exportData.ideas = projectData.ideas
      }
      if (sections.roadmap) {
        exportData.roadmap = projectData.roadmap
      }
      if (sections.technical) {
        exportData.technical = projectData.technical
      }
      if (sections.design) {
        exportData.design = projectData.design
      }

      let content
      let filename
      let mimeType

      switch (format) {
        case 'json':
          content = JSON.stringify(exportData, null, 2)
          filename = 'project-export.json'
          mimeType = 'application/json'
          break
        case 'markdown':
          content = generateMarkdown(exportData)
          filename = 'project-export.md'
          mimeType = 'text/markdown'
          break
        case 'html':
          content = generateHTML(exportData)
          filename = 'project-export.html'
          mimeType = 'text/html'
          break
        case 'pdf':
          // Implement PDF generation
          break
      }

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      onClose()
    } catch (error) {
      console.error('Export failed:', error)
      // Handle error
    } finally {
      setIsExporting(false)
    }
  }

  const generateMarkdown = (data) => {
    let md = '# Project Export\n\n'
    
    if (data.ideas) {
      md += '## Ideas\n\n'
      data.ideas.forEach(idea => {
        md += `### ${idea.title}\n${idea.description}\n\n`
      })
    }

    if (data.roadmap) {
      md += '## Roadmap\n\n'
      data.roadmap.forEach(phase => {
        md += `### ${phase.title}\n`
        md += `Duration: ${phase.duration}\n\n`
        phase.tasks.forEach(task => {
          md += `- ${task.name}\n`
        })
        md += '\n'
      })
    }

    return md
  }

  const generateHTML = (data) => {
    // Implement HTML generation
    return '<html>...</html>'
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Export Project</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Export Format
          </Typography>
          <RadioGroup
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <FormControlLabel 
              value="json" 
              control={<Radio />} 
              label="JSON" 
            />
            <FormControlLabel 
              value="markdown" 
              control={<Radio />} 
              label="Markdown" 
            />
            <FormControlLabel 
              value="html" 
              control={<Radio />} 
              label="HTML" 
            />
            <FormControlLabel 
              value="pdf" 
              control={<Radio />} 
              label="PDF" 
            />
          </RadioGroup>
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Include Sections
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sections.ideas}
                  onChange={(e) => setSections({
                    ...sections,
                    ideas: e.target.checked
                  })}
                />
              }
              label="Ideas and Concepts"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sections.roadmap}
                  onChange={(e) => setSections({
                    ...sections,
                    roadmap: e.target.checked
                  })}
                />
              }
              label="Development Roadmap"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sections.technical}
                  onChange={(e) => setSections({
                    ...sections,
                    technical: e.target.checked
                  })}
                />
              }
              label="Technical Specifications"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sections.design}
                  onChange={(e) => setSections({
                    ...sections,
                    design: e.target.checked
                  })}
                />
              }
              label="Design Assets"
            />
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleExport}
          startIcon={isExporting ? <CircularProgress size={20} /> : <DownloadIcon />}
          disabled={isExporting}
        >
          Export
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExportDialog
