import { createSlice } from '@reduxjs/toolkit'

const segmentSlice = createSlice({
  name: 'segments',
  initialState: {
    availableSegments: {
      ui: [
        { 
          id: 'ui-1', 
          description: 'A rectangular button with rounded corners, in blue, with white text.' 
        },
        { 
          id: 'ui-2', 
          description: 'A circular button with a color gradient, with an animated effect on hover.' 
        },
        { 
          id: 'ui-3', 
          description: 'An icon button (e.g. an arrow) that changes color when clicked.' 
        }
      ],
      functionality: [
        { 
          id: 'func-1', 
          description: 'Social login with Google and Facebook integration' 
        },
        { 
          id: 'func-2', 
          description: 'Two-factor authentication using email verification' 
        }
      ]
    },
    selectedSegments: {}
  },
  reducers: {
    addSelectedSegment: (state, action) => {
      const { category, segment } = action.payload
      if (!state.selectedSegments[category]) {
        state.selectedSegments[category] = []
      }
      state.selectedSegments[category].push(segment)
    },
    removeSelectedSegment: (state, action) => {
      const { category, segmentId } = action.payload
      state.selectedSegments[category] = state.selectedSegments[category]
        .filter(segment => segment.id !== segmentId)
    },
    editSegment: (state, action) => {
      // Placeholder for segment editing logic
      console.log('Edit segment', action.payload)
    },
    generateNewSegments: (state, action) => {
      const { category, segments } = action.payload
      state.availableSegments[category] = [
        ...state.availableSegments[category],
        ...segments
      ]
    }
  }
})

export const { 
  addSelectedSegment, 
  removeSelectedSegment, 
  editSegment, 
  generateNewSegments 
} = segmentSlice.actions
export default segmentSlice.reducer
