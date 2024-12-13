import { createSlice } from '@reduxjs/toolkit'

const defaultPrompts = {
  mainPrompt: `You are a creative assistant who helps create an app. Based on the description of the app idea provided by the user, please generate detailed proposals regarding:

- Application architecture: Division into modules, choice of technology.
- User interface: Proposals for interface elements, layout, color scheme.
- Functionality: Ideas for new features that can enhance the app.

Present each proposal in the form of a concise, bullet-point description that will be easy for a non-programmer to understand.`,
  
  interfaceDesignPrompt: `Propose several visual concepts for UI elements. The design should be:
- Aesthetically pleasing
- Intuitive to use
- Aligned with modern design trends
- Responsive across different device sizes`,
  
  featuresPrompt: `Generate innovative feature ideas that can:
- Enhance user engagement
- Solve specific user pain points
- Differentiate the app from competitors
- Provide unique value proposition`
}

const llmConfigSlice = createSlice({
  name: 'llmConfig',
  initialState: {
    modelType: 'local', // 'local' or 'external'
    localConfig: {
      serverUrl: 'http://localhost:11434',
      availableModels: [], // Will be populated dynamically
      selectedModel: null
    },
    externalConfig: {
      provider: '', // 'openai', 'anthropic', etc.
      apiKey: ''
    },
    prompts: defaultPrompts,
    wordCountTracking: {
      startTime: null,
      endTime: null,
      wordCount: 0
    }
  },
  reducers: {
    setModelType: (state, action) => {
      state.modelType = action.payload
    },
    setLocalServerUrl: (state, action) => {
      state.localConfig.serverUrl = action.payload
    },
    setAvailableModels: (state, action) => {
      state.localConfig.availableModels = action.payload
    },
    setSelectedModel: (state, action) => {
      state.localConfig.selectedModel = action.payload
    },
    setExternalConfig: (state, action) => {
      state.externalConfig = { ...state.externalConfig, ...action.payload }
    },
    updatePrompt: (state, action) => {
      const { promptKey, promptValue } = action.payload
      state.prompts[promptKey] = promptValue
    },
    resetPromptToDefault: (state, action) => {
      const { promptKey } = action.payload
      state.prompts[promptKey] = defaultPrompts[promptKey]
    },
    startWordCountTracking: (state) => {
      state.wordCountTracking.startTime = new Date()
      state.wordCountTracking.wordCount = 0
    },
    updateWordCount: (state, action) => {
      state.wordCountTracking.wordCount = action.payload
      state.wordCountTracking.endTime = new Date()
    }
  }
})

export const { 
  setModelType,
  setLocalServerUrl,
  setAvailableModels,
  setSelectedModel,
  setExternalConfig,
  updatePrompt,
  resetPromptToDefault,
  startWordCountTracking,
  updateWordCount
} = llmConfigSlice.actions
export default llmConfigSlice.reducer
