import { createSlice } from '@reduxjs/toolkit'

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    conversationHistory: [],
    currentProjectConcept: {
      id: null,
      name: '',
      description: '',
      elements: [],
      iterations: []
    },
    projectConcepts: []
  },
  reducers: {
    addConversationTurn: (state, action) => {
      const { userPrompt, llmResponse, timestamp } = action.payload
      state.conversationHistory.push({
        userPrompt,
        llmResponse,
        timestamp: timestamp || new Date().toISOString()
      })
    },
    updateCurrentProjectConcept: (state, action) => {
      state.currentProjectConcept = {
        ...state.currentProjectConcept,
        ...action.payload
      }
    },
    addProjectElement: (state, action) => {
      const element = action.payload
      // Prevent duplicates
      if (!state.currentProjectConcept.elements.some(e => e.id === element.id)) {
        state.currentProjectConcept.elements.push(element)
      }
    },
    removeProjectElement: (state, action) => {
      state.currentProjectConcept.elements = state.currentProjectConcept.elements
        .filter(element => element.id !== action.payload)
    },
    saveCurrentProjectConcept: (state) => {
      // If project doesn't exist, create new. If exists, update.
      const existingProjectIndex = state.projectConcepts.findIndex(
        p => p.id === state.currentProjectConcept.id
      )

      if (existingProjectIndex !== -1) {
        state.projectConcepts[existingProjectIndex] = {
          ...state.currentProjectConcept,
          updatedAt: new Date().toISOString()
        }
      } else {
        state.currentProjectConcept.id = `project-${Date.now()}`
        state.currentProjectConcept.createdAt = new Date().toISOString()
        state.projectConcepts.push(state.currentProjectConcept)
      }
    },
    addProjectIteration: (state, action) => {
      state.currentProjectConcept.iterations.push({
        ...action.payload,
        timestamp: new Date().toISOString()
      })
    }
  }
})

export const { 
  addConversationTurn,
  updateCurrentProjectConcept,
  addProjectElement,
  removeProjectElement,
  saveCurrentProjectConcept,
  addProjectIteration
} = conversationSlice.actions
export default conversationSlice.reducer
