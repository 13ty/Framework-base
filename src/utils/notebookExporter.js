export const exportToJupyter = (cells) => {
  const notebook = {
    metadata: {
      kernelspec: {
        display_name: 'Python 3',
        language: 'python',
        name: 'python3'
      },
      language_info: {
        codemirror_mode: {
          name: 'ipython',
          version: 3
        },
        file_extension: '.py',
        mimetype: 'text/x-python',
        name: 'python',
        nbconvert_exporter: 'python',
        pygments_lexer: 'ipython3',
        version: '3.8.0'
      }
    },
    nbformat: 4,
    nbformat_minor: 4,
    cells: cells.map(cell => {
      switch (cell.type) {
        case 'markdown':
          return {
            cell_type: 'markdown',
            metadata: {},
            source: [cell.content]
          }
        case 'code':
          return {
            cell_type: 'code',
            execution_count: null,
            metadata: {},
            outputs: [],
            source: [cell.content]
          }
        case 'drawing':
          return {
            cell_type: 'markdown',
            metadata: {},
            source: [`![Drawing](${cell.content})`]
          }
        case 'data':
          return {
            cell_type: 'code',
            execution_count: null,
            metadata: {},
            outputs: [],
            source: [
              'import pandas as pd\n',
              `df = pd.DataFrame(${JSON.stringify(cell.content)})\n`,
              'df'
            ]
          }
        default:
          return null
      }
    }).filter(Boolean)
  }

  return JSON.stringify(notebook, null, 2)
}

export const importFromJupyter = (notebookJson) => {
  const notebook = JSON.parse(notebookJson)
  
  return notebook.cells.map(cell => {
    const id = Date.now() + Math.random()
    
    switch (cell.cell_type) {
      case 'markdown':
        return {
          id,
          type: 'markdown',
          content: Array.isArray(cell.source) 
            ? cell.source.join('') 
            : cell.source
        }
      case 'code':
        return {
          id,
          type: 'code',
          content: Array.isArray(cell.source) 
            ? cell.source.join('') 
            : cell.source
        }
      default:
        return null
    }
  }).filter(Boolean)
}
