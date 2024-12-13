```typescript
export interface PipelineStep {
  type: 'prompt' | 'llm' | 'data' | 'external';
  name: string;
  config: Record<string, any>;
}

export interface PipelineConfig {
  id: string;
  name: string;
  description: string;
  steps: PipelineStep[];
}

export interface Pipeline {
  config: PipelineConfig;
  status: 'idle' | 'running' | 'completed' | 'error';
  lastRun?: Date;
  results?: any[];
}
```
