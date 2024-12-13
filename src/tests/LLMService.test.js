import { describe, it, expect, vi } from 'vitest'
import LLMService from '../services/llmService'
import axios from 'axios'

vi.mock('axios')

describe('LLMService', () => {
  it('generates local response correctly', async () => {
    const mockConfig = {
      modelType: 'local',
      localConfig: {
        serverUrl: 'http://localhost:11434',
        selectedModel: 'llama2'
      }
    }

    const mockResponse = {
      data: {
        response: 'Test response'
      }
    }

    axios.post.mockResolvedValue(mockResponse)

    const llmService = new LLMService(mockConfig)
    const response = await llmService.generateLocalResponse('test prompt')

    expect(response).toBe('Test response')
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:11434/api/generate',
      expect.any(Object)
    )
  })

  it('throws error for unsupported external provider', async () => {
    const mockConfig = {
      modelType: 'external',
      externalConfig: {
        provider: 'unsupported'
      }
    }

    const llmService = new LLMService(mockConfig)
    await expect(llmService.generateExternalResponse('test'))
      .rejects
      .toThrow('Unsupported external provider')
  })
})
