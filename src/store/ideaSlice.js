import { createSlice } from '@reduxjs/toolkit'

const ideaSlice = createSlice({
  name: 'idea',
  initialState: {
    projectType: '',
    targetAudience: '',
    coreFunctionality: '',
    description: '',
    aiResponse: null
  },
  reducers: {
    setProjectDetails: (state, action) => {
      return { ...state, ...action.payload }
    },
    setAIResponse: (state, action) => {
      state.aiResponse = action.payload
    }
  }
})

export const { setProjectDetails, setAIResponse } = ideaSlice.actions
export default ideaSlice.reducer
