import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Home from '../pages/Home'
import conversationReducer from '../store/conversationSlice'

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      conversation: conversationReducer
    },
    preloadedState: initialState
  })
}

describe('Home Component', () => {
  it('renders the main title', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    )
    
    expect(screen.getByText('AI App Idea Generator')).toBeInTheDocument()
  })

  it('displays recent projects when available', () => {
    const mockProjects = {
      conversation: {
        projectConcepts: [
          {
            id: '1',
            name: 'Test Project',
            description: 'Test Description',
            createdAt: new Date().toISOString()
          }
        ]
      }
    }

    const store = createMockStore(mockProjects)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    )
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })
})
