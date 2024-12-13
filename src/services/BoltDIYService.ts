```typescript
import axios, { AxiosInstance } from 'axios';

interface BoltDIYConfig {
  endpoint: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

interface ProjectData {
  name: string;
  description: string;
  segments: any[]; // Replace with your segment type
  plan: any; // Replace with your plan type
  metadata?: Record<string, any>;
}

class BoltDIYService {
  private client: AxiosInstance;
  private config: BoltDIYConfig;

  constructor(config: BoltDIYConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.endpoint,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` }),
        ...config.headers
      }
    });
  }

  async sendProject(projectData: ProjectData): Promise<any> {
    try {
      const response = await this.client.post('/project', projectData);
      return response.data;
    } catch (error) {
      console.error('Failed to send project to Bolt.diy:', error);
      throw error;
    }
  }

  async getStatus(): Promise<any> {
    try {
      const response = await this.client.get('/status');
      return response.data;
    } catch (error) {
      console.error('Failed to get Bolt.diy status:', error);
      throw error;
    }
  }
}

export default BoltDIYService;
```
