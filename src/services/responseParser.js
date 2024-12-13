class ResponseParser {
  static parseIdeaSegments(response) {
    // Multiple parsing strategies
    const parsers = [
      this.parseStarBulletPoints,
      this.parseNumberedList,
      this.parseMarkdownList,
      this.parsePlainTextSegments
    ]

    for (let parser of parsers) {
      const segments = parser(response)
      if (segments.length > 0) return segments
    }

    return [{ 
      id: `idea-${Date.now()}`, 
      description: response.trim() 
    }]
  }

  static parseStarBulletPoints(text) {
    const segments = text.split(/\*\s*/)
      .filter(segment => segment.trim() !== '')
      .map((description, index) => ({
        id: `idea-star-${index}`,
        description: description.trim(),
        type: 'star-bullet'
      }))
    return segments
  }

  static parseNumberedList(text) {
    const segments = text.split(/\d+\.\s*/)
      .filter(segment => segment.trim() !== '')
      .map((description, index) => ({
        id: `idea-numbered-${index}`,
        description: description.trim(),
        type: 'numbered-list'
      }))
    return segments
  }

  static parseMarkdownList(text) {
    const segments = text.match(/^-\s*.+$/gm) || []
    return segments.map((description, index) => ({
      id: `idea-markdown-${index}`,
      description: description.replace(/^-\s*/, '').trim(),
      type: 'markdown-list'
    }))
  }

  static parsePlainTextSegments(text) {
    // Split by sentences, but keep meaningful content
    const segments = text
      .split(/\.\s+/)
      .filter(segment => 
        segment.trim().length > 10 && 
        !/^\s*[a-z]/.test(segment)
      )
      .map((description, index) => ({
        id: `idea-plain-${index}`,
        description: description.trim() + '.',
        type: 'plain-text'
      }))
    return segments
  }
}

export default ResponseParser
