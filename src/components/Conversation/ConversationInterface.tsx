// Update the ConversationInterface to use the LLM service
import { useLLM } from '../../hooks/useLLM';

// Inside the component:
const llmConfig = {
  endpoint: process.env.REACT_APP_LLM_ENDPOINT || 'http://localhost:11434',
  modelName: 'llama2',
  parameters: {
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  }
};

const { generate, isLoading, error } = useLLM(llmConfig, {
  onError: (error) => {
    // Handle error (e.g., show notification)
    console.error('LLM Error:', error);
  }
});

// Update handleSend to use the LLM service:
const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage = {
    id: Date.now().toString(),
    content: input,
    role: 'user',
    timestamp: new Date(),
    type: 'text'
  };

  setMessages(prev => [...prev, userMessage]);
  setInput('');

  try {
    const response = await generate(input, context);
    
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      content: response.content,
      role: 'assistant',
      timestamp: new Date(),
      type: response.type,
      metadata: response.metadata
    };

    setMessages(prev => [...prev, assistantMessage]);
  } catch (error) {
    // Error is handled by the useLLM hook
    console.error('Failed to generate response:', error);
  }
};
