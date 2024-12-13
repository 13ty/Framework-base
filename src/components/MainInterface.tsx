```typescript
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { ModelConfig, PerformanceMetrics, ResponseSegment } from '../types';
import { ModelService } from '../services/ModelService';
import SegmentedResponse from './FloatingInterface/ResponseDisplay';
import IdeaInput from './Input/IdeaInput';
import { FloatingContainer } from './FloatingInterface/FloatingContainer';
import SettingsPanel from './Settings/SettingsPanel';

interface MainInterfaceProps {
  modelConfig: ModelConfig;
  onMetricsUpdate: (metrics: PerformanceMetrics) => void;
}

const MainInterface: React.FC<MainInterfaceProps> = ({
  modelConfig,
  onMetricsUpdate
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [segments, setSegments] = useState<ResponseSegment[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerate = async (input: string) => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const modelService = new ModelService(modelConfig);
      const { segments, metrics } = await modelService.generate(input);
      setSegments(segments);
      onMetricsUpdate(metrics);
    } catch (error) {
      console.error('Generation failed:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSegment = (segment: ResponseSegment) => {
    // Handle adding segment to plan
    console.log('Adding segment:', segment);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <FloatingContainer onSettingsOpen={() => setIsSettingsOpen(true)}>
        <IdeaInput
          onSubmit={handleGenerate}
        />
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <SegmentedResponse
          segments={segments}
          onAddSegment={handleAddSegment}
        />
      </FloatingContainer>

      <SettingsPanel
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Box>
  );
};

export default MainInterface;
```
