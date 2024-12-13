import axios from 'axios';

export interface OllamaModel {
  name: string;
  size: string;
  modified: string;
  digest: string;
}

export interface ExternalModelConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  modelName: string;
  endpoint?: string;
}

export interface ModelSettings {
  type: 'ollama' | 'external';
  ollamaEndpoint?: string;
  selectedModel?: string;
  externalConfig?: ExternalModelConfig;
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };
}

class ModelConfigService {
  private static instance: ModelConfigService;
  private settings: ModelSettings;

  private constructor() {
    this.settings = this.loadSettings();
  }

  static getInstance(): ModelConfigService {
    if (!ModelConfigService.instance) {
      ModelConfigService.instance = new ModelConfigService();
    }
    return ModelConfigService.instance;
  }

  private loadSettings(): ModelSettings {
    const savedSettings = localStorage.getItem('modelSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      type: 'ollama',
      ollamaEndpoint: 'http://localhost:11434',
      parameters: {
        temperature: 0.7,
        maxTokens: 2000,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0
      }
    };
  }

  async getOllamaModels(): Promise<OllamaModel[]> {
    try {
      const response = await axios.get(
        `${this.settings.ollamaEndpoint}/api/tags`
      );
      return response.data.models || [];
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error);
      throw error;
    }
  }

  async testOllamaConnection(): Promise<boolean> {
    try {
      await this.getOllamaModels();
      return true;
    } catch {
      return false;
    }
  }

  async testExternalConnection(): Promise<boolean> {
    if (!this.settings.externalConfig) return false;

    try {
      // Implement test connection based on provider
      switch (this.settings.externalConfig.provider) {
        case 'openai':
          // Test OpenAI connection
          break;
        case 'anthropic':
          // Test Anthropic connection
          break;
        default:
          // Test custom endpoint
          break;
      }
      return true;
    } catch {
      return false;
    }
  }

  updateSettings(newSettings: Partial<ModelSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem('modelSettings', JSON.stringify(this.settings));
  }

  getSettings(): ModelSettings {
    return { ...this.settings };
  }
}

export default ModelConfigService;
