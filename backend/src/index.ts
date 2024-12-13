```typescript
import express from 'express';
import { PipelineEngine } from './services/PipelineEngine';
import { DataLayer } from './services/DataLayer';

const app = express();
const port = 3006; // Using a different port for the backend

// Initialize DataLayer (replace with your actual database setup)
const dataLayer = new DataLayer('mongodb://localhost:27017/idea-generator');

// Initialize PipelineEngine
const pipelineEngine = new PipelineEngine(dataLayer);

app.get('/', (req, res) => {
  res.send('AI App Idea Generator Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
```
