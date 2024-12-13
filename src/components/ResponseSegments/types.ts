export interface Segment {
  id: string;
  content: string;
  type: 'feature' | 'architecture' | 'implementation' | 'design' | 'technical';
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  metadata?: {
    tags: string[];
    complexity?: number;
    estimatedTime?: string;
    dependencies?: string[];
  };
}

export interface PlanItem extends Segment {
  added: Date;
  status: 'todo' | 'in-progress' | 'completed';
  notes?: string;
  order: number;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  items: PlanItem[];
  created: Date;
  updated: Date;
  categories: string[];
}
