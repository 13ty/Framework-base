// Update the tabs to include new analysis tools
const tabs = [
  { 
    label: 'Generate', 
    icon: <AutoAwesomeIcon />, 
    component: ResponseList 
  },
  { 
    label: 'Project Assistant', 
    icon: <BuildIcon />, 
    component: ProjectAssistant 
  },
  { 
    label: 'Requirements', 
    icon: <ListAltIcon />, 
    component: RequirementsAnalyzer 
  },
  { 
    label: 'Resources', 
    icon: <TimelineIcon />, 
    component: ResourceEstimator 
  },
  { 
    label: 'Tech Stack', 
    icon: <CodeIcon />, 
    component: TechStackAnalyzer 
  },
  { 
    label: 'Visualize', 
    icon: <BubbleChartIcon />, 
    component: CreativeCanvas 
  }
]

// ... rest of the IdeaWorkspace component with updated tab rendering
