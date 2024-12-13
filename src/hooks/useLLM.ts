import { useState, useCallback } from 'react';
import LLMService from '../services/LLMService';
import { LLMConfig, LLMResponse, LLMError } from '../services/types';

interface UseLLMOptions {
  onError?: (error: LLMError) => void;
  onSuccess?: (response: LLMResponse) => void;
}

export const useLLM = (config: LLMConfig, options?: UseLLMOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LLMError | null>(null);
  const [lastResponse, setLastResponse] = useState<LLMResponse | null>(null);

  const llmService = new LLMService(config);

  const generate = useCallback(async (
    prompt: string,
    context?: Record<string, any>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await llmService.generateResponse(prompt, context);
      setLastResponse(response);
      options?.onSuccess?.(response);
      return response;
    } catch (err: any) {
      const error: LLMError = {
        code: err.code || 'UNKNOWN',
        message: err.message,
        details: err.details
      };
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [llmService, options]);

  const generateWithTemplate = useCallback(async (
    templateId: string,
    variables: Record<string, string>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await llmService.generateWithTemplate(
        { id: templateId } as any, // TODO: Fix type
        variables
      );
      setLastResponse(response);
      options?.onSuccess?.(response);
      return response;
    } catch (err: any) {
      const error: LLMError = {
        code: err.code || 'UNKNOWN',
        message: err.message,
        details: err.details
      };
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [llmService, options]);

  return {
    generate,
    generateWithTemplate,
    isLoading,
    error,
    lastResponse
  };
};
