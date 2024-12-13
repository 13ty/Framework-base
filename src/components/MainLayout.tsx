import React, { useState } from 'react';
import { Box } from '@mui/material';
import PlanPanel from './PlanPanel/PlanPanel';
import SegmentedResponse from './ResponseSegments/SegmentedResponse';
import { Plan, Segment } from './ResponseSegments/types';

const MainLayout: React.FC = () => {
  const [isPlanOpen, setIsPlanOpen] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<Plan>({
    id: '1',
    name: 'New Project',
    items: [],
    created: new Date(),
    updated: new Date(),
    categories: []
  });

  const handleAddToPlan = (segment: Segment) => {
    const planItem = {
      ...segment,
      added: new Date(),
      status: 'todo' as const,
      order: currentPlan.items.length
    };

    setCurrentPlan({
      ...currentPlan,
      items: [...currentPlan.items, planItem],
      updated: new Date()
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <PlanPanel
        open={isPlanOpen}
        plan={currentPlan}
        onPlanUpdate={setCurrentPlan}
        onClose={() => setIsPlanOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isPlanOpen ? '320px' : 0,
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
        }}
      >
        {/* Your main content */}
        <SegmentedResponse
          segments={[/* Your segments */]}
          onAddToPlan={handleAddToPlan}
        />
      </Box>
    </Box>
  );
};

export default MainLayout;
