import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import IdeaGeneratorPage from '../pages/IdeaGeneratorPage'
import conversationReducer from '../store/conversationSlice'
import llmConfigReducer from '../store/llmConfigSlice'

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      conversation: conversationReducer,
      llmConfig: llmConfigReducer
    },
    preloadedState: initialState
  })
}

describe('IdeaGeneratorPage', () => {
  it('renders query input', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <IdeaGeneratorPage />
      </Provider>
    )
    
    expect(screen.getByPlaceholderText(/create a language learning app/i))
      .toBeInTheDocument()
  })

  it('displays word count tracker', () => {
    const store = createMockStore({
      llmConfig: {
        wordCountTracking: {
          wordCount: 100,
          startTime: new Date(Date.now() - 60000).toISOString(),
          endTime: new Date().toISOString()
        }
      }
    })

    render(
      <Provider store={store}>
        <IdeaGeneratorPage />
      </Provider>
    )
    
    expect(screen.getByText(/WPM:/)).toBeInTheDocument()
  })
})
