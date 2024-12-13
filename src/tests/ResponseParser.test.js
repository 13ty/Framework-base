import { describe, it, expect } from 'vitest'
import ResponseParser from '../services/responseParser'

describe('ResponseParser', () => {
  it('parses star bullet points correctly', () => {
    const input = `
      * First idea
      * Second idea
      * Third idea
    `
    const result = ResponseParser.parseStarBulletPoints(input)
    expect(result).toHaveLength(3)
    expect(result[0].description).toBe('First idea')
  })

  it('parses numbered list correctly', () => {
    const input = `
      1. First item
      2. Second item
      3. Third item
    `
    const result = ResponseParser.parseNumberedList(input)
    expect(result).toHaveLength(3)
    expect(result[0].description).toBe('First item')
  })

  it('parses markdown list correctly', () => {
    const input = `
      - First point
      - Second point
      - Third point
    `
    const result = ResponseParser.parseMarkdownList(input)
    expect(result).toHaveLength(3)
    expect(result[0].description).toBe('First point')
  })
})
