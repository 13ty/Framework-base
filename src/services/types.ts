export interface LLMConfig {
  endpoint: string;
  modelName: string;
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
  headers?: Record<string, string>;
}

export interface LLMResponse {
  content: string;
  type: 'text' | 'code' | 'suggestion' | 'error';
  metadata?: {
    confidence?: number;
    category?: string;
    tags?: string[];
    processingTime?: number;
  };
}

export interface PromptTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  category: 'ideation' | 'technical' | 'analysis' | 'refinement';
}

export interface LLMError {
  code: string;
  message: string;
  details?: any;
}
