import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    modelType: 'local',
    ollamaUrl: 'http://localhost:11434',
    selectedModel: '',
    apiKey: '',
    provider: 'openai'
  },
  reducers: {
    updateSettings: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer
