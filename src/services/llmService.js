import axios from 'axios'

class LLMService {
  constructor(config) {
    this.config = config
  }

  async generateResponse(prompt, context) {
    const { modelType, localConfig, externalConfig, prompts } = this.config

    if (modelType === 'local') {
      return this.generateLocalResponse(prompt, context)
    } else {
      return this.generateExternalResponse(prompt, context)
    }
  }

  async generateLocalResponse(prompt, context) {
    const { serverUrl, selectedModel } = this.config.localConfig

    try {
      const response = await axios.post(`${serverUrl}/api/generate`, {
        model: selectedModel,
        prompt: prompt,
        stream: false
      })

      return response.data.response
    } catch (error) {
      console.error('Local LLM generation failed', error)
      throw error
    }
  }

  async generateExternalResponse(prompt, context) {
    const { provider, apiKey } = this.config.externalConfig

    switch(provider) {
      case 'openai':
        return this.generateOpenAIResponse(prompt, apiKey)
      case 'anthropic':
        return this.generateAnthropicResponse(prompt, apiKey)
      default:
        throw new Error('Unsupported external provider')
    }
  }

  async generateOpenAIResponse(prompt, apiKey) {
    // Placeholder for OpenAI API integration
    throw new Error('OpenAI integration not implemented')
  }

  async generateAnthropicResponse(prompt, apiKey) {
    // Placeholder for Anthropic API integration
    throw new Error('Anthropic integration not implemented')
  }
}

export default LLMService
