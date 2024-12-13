import axios, { AxiosInstance } from 'axios';
import { LLMConfig, LLMResponse, LLMError, PromptTemplate } from './types';

class LLMService {
  private client: AxiosInstance;
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.endpoint,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });
  }

  private async handleRequest<T>(
    request: Promise<T>
  ): Promise<T> {
    try {
      return await request;
    } catch (error: any) {
      const llmError: LLMError = {
        code: error.response?.status?.toString() || 'UNKNOWN',
        message: error.message,
        details: error.response?.data
      };
      throw llmError;
    }
  }

  async generateResponse(
    prompt: string,
    context?: Record<string, any>
  ): Promise<LLMResponse> {
    const startTime = Date.now();

    const response = await this.handleRequest(
      this.client.post('/generate', {
        model: this.config.modelName,
        prompt,
        context,
        ...this.config.parameters
      })
    );

    const processingTime = Date.now() - startTime;

    return {
      content: response.data.content,
      type: this.determineResponseType(response.data),
      metadata: {
        confidence: response.data.confidence,
        category: response.data.category,
        tags: response.data.tags,
        processingTime
      }
    };
  }

  private determineResponseType(
    response: any
  ): LLMResponse['type'] {
    if (response.error) return 'error';
    if (response.code) return 'code';
    if (response.suggestion) return 'suggestion';
    return 'text';
  }

  async generateWithTemplate(
    template: PromptTemplate,
    variables: Record<string, string>
  ): Promise<LLMResponse> {
    let prompt = template.template;
    
    // Replace template variables
    for (const [key, value] of Object.entries(variables)) {
      prompt = prompt.replace(`{{${key}}}`, value);
    }

    return this.generateResponse(prompt, { 
      templateId: template.id,
      category: template.category 
    });
  }

  async streamResponse(
    prompt: string,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const response = await this.client.post('/generate/stream', {
      model: this.config.modelName,
      prompt,
      ...this.config.parameters
    }, {
      responseType: 'stream'
    });

    for await (const chunk of response.data) {
      onChunk(chunk.toString());
    }
  }
}

export default LLMService;
