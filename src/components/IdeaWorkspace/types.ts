export interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'architecture' | 'design' | 'technical';
  status: 'draft' | 'active' | 'completed';
  created: Date;
  updated: Date;
  tags: string[];
}

export interface IdeaFormData {
  title: string;
  description: string;
  category: Idea['category'];
  tags: string[];
}

export interface IdeaWorkspaceProps {
  onIdeaCreate?: (idea: Idea) => void;
  onIdeaUpdate?: (id: string, idea: Idea) => void;
  onIdeaDelete?: (id: string) => void;
}
