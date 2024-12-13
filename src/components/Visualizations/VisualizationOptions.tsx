```typescript
import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';

const OptionsWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

interface VisualizationOptionsProps {
  diagramType: string;
  onDiagramTypeChange: (type: string) => void;
}

const VisualizationOptions: React.FC<VisualizationOptionsProps> = ({
  diagramType,
  onDiagramTypeChange
}) => {
  return (
    <OptionsWrapper>
      <FormControl variant="outlined" size="small">
        <InputLabel>Diagram Type</InputLabel>
        <Select
          value={diagramType}
          onChange={(e) => onDiagramTypeChange(e.target.value as string)}
          label="Diagram Type"
        >
          <MenuItem value="mindmap">Mind Map</MenuItem>
          <MenuItem value="flowchart">Flowchart</MenuItem>
          <MenuItem value="sequenceDiagram">Sequence Diagram</MenuItem>
          <MenuItem value="graph">Graph</MenuItem>
          <MenuItem value="gantt">Gantt Chart</MenuItem>
        </Select>
      </FormControl>
    </OptionsWrapper>
  );
};

export default VisualizationOptions;
```
