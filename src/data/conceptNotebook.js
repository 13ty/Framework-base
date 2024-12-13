export const conceptNotebook = {
  metadata: {
    title: "AI App Idea Generator - Concept Documentation",
    created: new Date().toISOString(),
    version: "1.0.0"
  },
  cells: [
    {
      id: "intro",
      type: "markdown",
      content: `# AI App Idea Generator - Concept Overview
      
## Core Vision
Our application serves as an intelligent assistant for software development ideation and planning, leveraging AI to enhance the creative and technical aspects of project development.

### Key Objectives
- Streamline project ideation process
- Provide intelligent assistance in technical planning
- Enable knowledge harvesting and synthesis
- Support comprehensive project documentation

---`
    },
    {
      id: "architecture-diagram",
      type: "drawing",
      content: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="800" height="400">
          <!-- System Architecture Diagram -->
          <rect x="50" y="50" width="700" height="300" fill="#f5f5f5"/>
          <text x="400" y="100" text-anchor="middle" font-size="20">System Architecture</text>
          <!-- Add more SVG elements for architecture diagram -->
        </svg>
      `)}`,
      metadata: {
        title: "System Architecture Overview"
      }
    },
    {
      id: "feature-matrix",
      type: "data",
      content: {
        columns: ["Feature", "Priority", "Status", "Complexity", "Impact"],
        data: [
          ["Idea Generation", "High", "Implemented", "Medium", "High"],
          ["Knowledge Harvesting", "High", "In Progress", "High", "High"],
          ["Jupyter Integration", "Medium", "Planned", "Medium", "Medium"],
          ["LLM Integration", "High", "In Progress", "High", "High"],
          ["Visualization Tools", "Medium", "Implemented", "Medium", "Medium"]
        ]
      },
      metadata: {
        title: "Feature Implementation Matrix"
      }
    },
    {
      id: "llm-integration",
      type: "code",
      content: `
# LLM Integration Example
import requests

def query_llm(prompt, model_config):
    """
    Example of LLM integration for idea generation
    """
    if model_config['type'] == 'local':
        return query_local_llm(prompt, model_config)
    else:
        return query_external_llm(prompt, model_config)

def query_local_llm(prompt, config):
    url = f"{config['base_url']}/api/generate"
    response = requests.post(url, json={
        "prompt": prompt,
        "model": config['model'],
        "parameters": config['parameters']
    })
    return response.json()
`,
      metadata: {
        title: "LLM Integration Code Example"
      }
    },
    {
      id: "development-roadmap",
      type: "data",
      content: {
        type: "timeline",
        data: [
          {
            phase: "Phase 1",
            features: ["Core UI", "Basic LLM Integration", "Project Management"],
            duration: "2 months"
          },
          {
            phase: "Phase 2",
            features: ["Knowledge Harvesting", "Jupyter Integration", "Advanced Analytics"],
            duration: "3 months"
          },
          {
            phase: "Phase 3",
            features: ["Advanced Visualization", "AI Enhancements", "Collaboration Features"],
            duration: "2 months"
          }
        ]
      },
      metadata: {
        title: "Development Roadmap"
      }
    },
    {
      id: "visualization-example",
      type: "code",
      content: `
import matplotlib.pyplot as plt
import numpy as np

# Create example visualization
def create_project_visualization():
    categories = ['Ideation', 'Planning', 'Architecture', 'Development', 'Analysis']
    values = [85, 70, 60, 45, 75]
    
    plt.figure(figsize=(10, 6))
    plt.bar(categories, values, color='skyblue')
    plt.title('Project Component Completion Status')
    plt.ylabel('Completion %')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

create_project_visualization()
`,
      metadata: {
        title: "Project Visualization Example"
      }
    },
    {
      id: "knowledge-harvesting",
      type: "markdown",
      content: `## Knowledge Harvesting System

### Data Collection Sources
1. Academic Papers
2. Technical Blogs
3. Forum Discussions
4. Video Content
5. Documentation

### Processing Pipeline
1. Source Identification
2. Content Extraction
3. Relevance Analysis
4. Knowledge Synthesis
5. Storage & Indexing

### Integration Points
- Jupyter Notebooks for analysis
- LLM for content processing
- Visualization tools for insights
- Export capabilities for sharing

---`
    },
    {
      id: "metrics-dashboard",
      type: "data",
      content: {
        type: "dashboard",
        metrics: [
          {
            name: "Ideas Generated",
            value: 150,
            trend: "+15%"
          },
          {
            name: "Knowledge Items",
            value: 1240,
            trend: "+32%"
          },
          {
            name: "Projects Created",
            value: 45,
            trend: "+8%"
          },
          {
            name: "Analysis Reports",
            value: 89,
            trend: "+22%"
          }
        ]
      },
      metadata: {
        title: "Performance Metrics Dashboard"
      }
    },
    {
      id: "future-enhancements",
      type: "markdown",
      content: `## Future Enhancements

### AI Capabilities
- Advanced pattern recognition
- Predictive project planning
- Automated documentation generation
- Context-aware suggestions

### Integration Features
- Version control systems
- CI/CD pipelines
- Cloud deployment
- Team collaboration tools

### Analysis Tools
- Custom visualization builders
- Advanced metrics tracking
- Comparative analysis
- Performance optimization

---`
    }
  ]
}
