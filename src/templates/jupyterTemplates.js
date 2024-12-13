export const notebookTemplates = {
  projectPlanning: {
    name: 'Project Planning Analysis',
    description: 'Analyze and structure project requirements and architecture',
    template: `{
      "cells": [
        {
          "cell_type": "markdown",
          "source": [
            "# Project Planning Analysis\\n",
            "## Automated project structure and requirements analysis\\n",
            "This notebook helps organize and analyze project components."
          ]
        },
        {
          "cell_type": "code",
          "source": [
            "import json\\n",
            "import pandas as pd\\n",
            "\\n",
            "# Project structure analysis\\n",
            "def analyze_project_structure(components):\\n",
            "    # Analyze dependencies and relationships\\n",
            "    # Generate component graph\\n",
            "    # Identify critical paths\\n",
            "    pass\\n",
            "\\n",
            "# Requirements processing\\n",
            "def process_requirements(requirements):\\n",
            "    # Categorize requirements\\n",
            "    # Identify dependencies\\n",
            "    # Generate priority matrix\\n",
            "    pass"
          ]
        },
        {
          "cell_type": "markdown",
          "source": [
            "## Visualization Section\\n",
            "Generate visual representations of project structure"
          ]
        },
        {
          "cell_type": "code",
          "source": [
            "import networkx as nx\\n",
            "import matplotlib.pyplot as plt\\n",
            "\\n",
            "def visualize_project_graph(components):\\n",
            "    # Create component relationship graph\\n",
            "    # Generate interactive visualization\\n",
            "    pass"
          ]
        }
      ]
    }`
  },

  architectureDesign: {
    name: 'Architecture Design Helper',
    description: 'Analyze and visualize system architecture',
    template: `{
      "cells": [
        {
          "cell_type": "markdown",
          "source": [
            "# Architecture Design Analysis\\n",
            "## System component analysis and visualization\\n",
            "Helps analyze and optimize system architecture."
          ]
        },
        {
          "cell_type": "code",
          "source": [
            "import json\\n",
            "import networkx as nx\\n",
            "\\n",
            "# Architecture analysis\\n",
            "def analyze_architecture(components):\\n",
            "    # Analyze component relationships\\n",
            "    # Check for potential bottlenecks\\n",
            "    # Suggest optimizations\\n",
            "    pass\\n",
            "\\n",
            "# Performance modeling\\n",
            "def model_performance(architecture):\\n",
            "    # Create performance models\\n",
            "    # Identify potential issues\\n",
            "    # Suggest improvements\\n",
            "    pass"
          ]
        }
      ]
    }`
  },

  featureAnalysis: {
    name: 'Feature Analysis and Planning',
    description: 'Analyze feature requirements and dependencies',
    template: `{
      "cells": [
        {
          "cell_type": "markdown",
          "source": [
            "# Feature Analysis\\n",
            "## Feature planning and dependency analysis\\n",
            "Analyze feature relationships and implementation planning."
          ]
        },
        {
          "cell_type": "code",
          "source": [
            "import pandas as pd\\n",
            "import networkx as nx\\n",
            "\\n",
            "# Feature dependency analysis\\n",
            "def analyze_features(features):\\n",
            "    # Create dependency graph\\n",
            "    # Identify implementation order\\n",
            "    # Generate timeline\\n",
            "    pass\\n",
            "\\n",
            "# Implementation planning\\n",
            "def create_implementation_plan(features, dependencies):\\n",
            "    # Generate implementation phases\\n",
            "    # Create resource allocation plan\\n",
            "    # Define milestones\\n",
            "    pass"
          ]
        }
      ]
    }`
  }
}

export const generateNotebook = (template, projectData) => {
  const notebook = JSON.parse(notebookTemplates[template].template)
  // Customize notebook based on projectData
  return notebook
}
