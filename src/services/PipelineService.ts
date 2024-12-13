```typescript
import { PipelineConfig, PipelineStep } from '../types/pipeline';
import { ModelService } from './ModelService';
import { getPromptTemplate } from '../config/defaultPrompts';

class PipelineService {
  async runPipeline(pipeline: PipelineConfig): Promise<any[]> {
    const results: any[] = [];
    for (const step of pipeline.steps) {
      const result = await this.executeStep(step);
      results.push(result);
    }
    return results;
  }

  private async executeStep(step: PipelineStep): Promise<any> {
    switch (step.type) {
      case 'prompt':
        return this.handlePromptStep(step);
      case 'llm':
        return this.handleLLMStep(step);
      case 'data':
        return this.handleDataStep(step);
      case 'external':
        return this.handleExternalStep(step);
      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }

  private async handlePromptStep(step: PipelineStep): Promise<string> {
    const { template, variables } = step.config;
    if (!template) {
      throw new Error('Prompt template is required for prompt step');
    }
    return getPromptTemplate(template, variables);
  }

  private async handleLLMStep(step: PipelineStep): Promise<any> {
    const { modelConfig, prompt } = step.config;
    if (!modelConfig || !prompt) {
      throw new Error('Model configuration and prompt are required for LLM step');
    }
    const modelService = new ModelService(modelConfig);
    return modelService.generate(prompt);
  }

  private async handleDataStep(step: PipelineStep): Promise<any> {
    // Implement data processing logic
    console.log('Processing data step:', step);
    return { status: 'Data step not implemented yet' };
  }

  private async handleExternalStep(step: PipelineStep): Promise<any> {
    // Implement external service call logic
    console.log('Handling external step:', step);
    return { status: 'External step not implemented yet' };
  }
}

export default PipelineService;
```
