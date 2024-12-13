```typescript
import axios from 'axios';
import { ModelConfig, ResponseSegment, PerformanceMetrics } from '../types';

export class ModelService {
  private config: ModelConfig;
  private startTime: number = 0;

  constructor(config: ModelConfig) {
    this.config = config;
  }

  private async callOllama(prompt: string): Promise<string> {
    const response = await axios.post(`${this.config.endpoint}/api/generate`, {
      model: this.config.modelName,
      prompt,
      ...this.config.parameters
    });
    return response.data.response;
  }

  private async callExternalAPI(prompt: string): Promise<string> {
    // Implement external API call based on config.type
    throw new Error('External API not implemented');
  }

  private calculateMetrics(response: string): PerformanceMetrics {
    const endTime = Date.now();
    const responseTime = endTime - this.startTime;
    const wordCount = response.split(/\s+/).length;
    const wordsPerMinute = Math.round((wordCount / responseTime) * 60000);

    return {
      responseTime,
      wordCount,
      wordsPerMinute,
      timestamp: new Date()
    };
  }

  private parseResponse(response: string): ResponseSegment[] {
    return response
      .split('*')
      .filter(segment => segment.trim())
      .map((segment, index) => ({
        id: `segment-${index}`,
        content: segment.trim(),
        type: this.determineType(segment),
        metadata: {
          tags: this.extractTags(segment),
          priority: this.determinePriority(segment),
          complexity: this.determineComplexity(segment)
        }
      }));
  }

  private determineType(segment: string): ResponseSegment['type'] {
    if (segment.toLowerCase().includes('interface') || 
        segment.toLowerCase().includes('ui') ||
        segment.toLowerCase().includes('design')) {
      return 'ui';
    }
    if (segment.toLowerCase().includes('architecture') ||
        segment.toLowerCase().includes('system')) {
      return 'architecture';
    }
    if (segment.toLowerCase().includes('feature') ||
        segment.toLowerCase().includes('functionality')) {
      return 'feature';
    }
    return 'technical';
  }

  private extractTags(segment: string): string[] {
    // Implement tag extraction logic
    return [];
  }

  private determinePriority(segment: string): 'high' | 'medium' | 'low' {
    // Implement priority determination logic
    return 'medium';
  }

  private determineComplexity(segment: string): number {
    // Implement complexity determination logic
    return 1;
  }

  async generate(prompt: string): Promise<{
    segments: ResponseSegment[];
    metrics: PerformanceMetrics;
  }> {
    this.startTime = Date.now();
    
    const response = this.config.type === 'ollama'
      ? await this.callOllama(prompt)
      : await this.callExternalAPI(prompt);

    const metrics = this.calculateMetrics(response);
    const segments = this.parseResponse(response);

    return { segments, metrics };
  }
}
```
