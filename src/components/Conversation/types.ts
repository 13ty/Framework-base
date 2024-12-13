export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'idea' | 'suggestion' | 'code';
  metadata?: {
    category?: string;
    confidence?: number;
    tags?: string[];
  };
}

export interface ConversationContext {
  projectId?: string;
  topic?: string;
  ideaType?: 'feature' | 'architecture' | 'design' | 'technical';
  stage?: 'ideation' | 'refinement' | 'technical' | 'implementation';
}

export interface ConversationProps {
  onNewIdea?: (idea: any) => void;
  onSaveSuggestion?: (suggestion: any) => void;
  context?: ConversationContext;
}

export interface ModelConfig {
  endpoint: string;
  modelName: string;
  temperature?: number;
  maxTokens?: number;
}
