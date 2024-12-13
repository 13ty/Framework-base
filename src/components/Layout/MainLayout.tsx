```typescript
import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TopBar from './TopBar';
import SidePanel from './SidePanel';
import FloatingContainer from '../FloatingInterface/FloatingContainer';
import IdeaInput from '../Input/IdeaInput';
import ResponseDisplay from '../FloatingInterface/ResponseDisplay';
import { ResponseSegment, ModelConfig, PerformanceMetrics, Plan } from '../../types';
import { ModelService } from '../../services/ModelService';
import SettingsPanel from '../Settings/SettingsPanel';
import { defaultPrompts, getPromptTemplate } from '../../config/defaultPrompts';

interface MainLayoutProps {
  modelConfig: ModelConfig;
  onMetricsUpdate: (metrics: PerformanceMetrics) => void;
  onSettingsChange: (config: ModelConfig) => void;
  plan: Plan;
  onPlanUpdate: (plan: Plan) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  modelConfig,
  onMetricsUpdate,
  onSettingsChange,
  plan,
  onPlanUpdate
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [segments, setSegments] = useState<ResponseSegment[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleGenerate = async (input: string) => {
    const modelService = new ModelService(modelConfig);
    const prompt = getPromptTemplate('main', { description: input });

    const { segments, metrics } = await modelService.generate(prompt);
    setSegments(segments);
    onMetricsUpdate(metrics);
  };

  const handleAddSegment = (segment: ResponseSegment) => {
    const planItem = {
      ...segment,
      added: new Date(),
      status: 'todo' as const,
      order: plan.items.length
    };

    onPlanUpdate({
      ...plan,
      items: [...plan.items, planItem],
      updated: new Date()
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopBar
        metrics={null} // Remove metrics for now
        modelConfig={modelConfig}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMenuClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
        isMobile={isMobile}
      />

      {/* Side Panel */}
      <SidePanel
        open={isSidePanelOpen && !isMobile}
        onClose={() => setIsSidePanelOpen(false)}
        plan={plan}
        onPlanUpdate={onPlanUpdate}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${isSidePanelOpen ? 320 : 0}px)` },
          ml: { md: isSidePanelOpen ? `${320}px` : 0 },
          mt: '64px'
        }}
      >
        <FloatingContainer onSettingsOpen={() => setIsSettingsOpen(true)}>
          <IdeaInput onSubmit={handleGenerate} />
          <ResponseDisplay
            segments={segments}
            onAddSegment={handleAddSegment}
          />
        </FloatingContainer>
      </Box>

      <SettingsPanel
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={onSettingsChange}
      />
    </Box>
  );
};

export default MainLayout;
```
