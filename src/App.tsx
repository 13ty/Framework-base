```typescript
import React, { useState } from 'react';
import { Box } from '@mui/material';
import MainLayout from './components/Layout/MainLayout';
import { ModelConfig, PerformanceMetrics } from './types';

function App() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    type: 'ollama',
    endpoint: 'http://localhost:11434',
    modelName: 'llama2',
    parameters: {
      temperature: 0.7,
      maxTokens: 2000
    }
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MainLayout
        modelConfig={modelConfig}
        onMetricsUpdate={setMetrics}
        onSettingsChange={setModelConfig}
      />
    </Box>
  );
}

export default App;
```
