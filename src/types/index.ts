```typescript
// Core types for the application
export interface AppConfig {
  version: string;
  defaultModel: string;
  defaultPrompts: Record<PromptType, string>;
}

export type PromptType = 
  | 'main'
  | 'interface'
  | 'features'
  | 'architecture'
  | 'technical';

export interface ModelConfig {
  type: 'ollama' | 'external';
  endpoint?: string;
  apiKey?: string;
  modelName: string;
  parameters: {
    temperature: number;
    maxTokens: number;
  };
}

export interface ProjectType {
  type: 'web' | 'mobile' | 'desktop';
  audience: string;
  functionality: string[];
  complexity: 'basic' | 'intermediate' | 'advanced';
}

export interface ResponseSegment {
  id: string;
  content: string;
  type: 'ui' | 'feature' | 'architecture' | 'technical';
  metadata?: {
    tags: string[];
    priority: 'high' | 'medium' | 'low';
    complexity: number;
    estimatedTime?: string;
  };
}

export interface PerformanceMetrics {
  responseTime: number;
  wordCount: number;
  wordsPerMinute: number;
  timestamp: Date;
}
```
