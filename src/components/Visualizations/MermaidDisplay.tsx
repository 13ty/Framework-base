```typescript
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Box } from '@mui/material';

interface MermaidDisplayProps {
  definition: string;
}

const MermaidDisplay: React.FC<MermaidDisplayProps> = ({ definition }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current) {
        try {
          const { svg: generatedSvg } = await mermaid.render('mermaid-diagram', definition);
          setSvg(generatedSvg);
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
          setSvg(`<div style="color: red;">Error rendering diagram</div>`);
        }
      }
    };

    renderDiagram();
  }, [definition]);

  useEffect(() => {
    if (mermaidRef.current && svg) {
      mermaidRef.current.innerHTML = svg;
    }
  }, [svg]);

  return (
    <Box ref={mermaidRef} sx={{ overflow: 'auto' }} />
  );
};

export default MermaidDisplay;
```
