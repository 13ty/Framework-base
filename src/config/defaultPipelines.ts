```typescript
import { PipelineConfig } from '../types/pipeline';

const defaultPipelines: PipelineConfig[] = [
  {
    id: 'idea-generation',
    name: 'Idea Generation',
    description: 'Generate app ideas based on user input',
    steps: [
      {
        type: 'prompt',
        name: 'Generate Prompt',
        config: {
          template: 'main',
          variables: {
            description: '{{userInput}}'
          }
        }
      },
      {
        type: 'llm',
        name: 'Generate Response',
        config: {
          modelConfig: {
            type: 'ollama',
            endpoint: 'http://localhost:11434',
            modelName: 'llama2',
            parameters: {
              temperature: 0.7,
              maxTokens: 2000
            }
          },
          prompt: '{{previousStepResult}}'
        }
      },
      {
        type: 'data',
        name: 'Parse Response',
        config: {
          method: 'segment',
          format: 'json'
        }
      }
    ]
  },
  {
    id: 'technical-analysis',
    name: 'Technical Analysis',
    description: 'Analyze technical aspects of an idea',
    steps: [
      {
        type: 'prompt',
        name: 'Generate Prompt',
        config: {
          template: 'technical',
          variables: {
            aspect: '{{userSelection}}'
          }
        }
      },
      {
        type: 'llm',
        name: 'Generate Response',
        config: {
          modelConfig: {
            type: 'ollama',
            endpoint: 'http://localhost:11434',
            modelName: 'llama2',
            parameters: {
              temperature: 0.7,
              maxTokens: 2000
            }
          },
          prompt: '{{previousStepResult}}'
        }
      }
    ]
  }
];

export default defaultPipelines;
```
