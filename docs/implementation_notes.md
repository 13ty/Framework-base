```markdown
# Implementation Notes

## Key Design Decisions

### 1. Interface Design
- Chose floating interface for minimal intrusion
- Implemented drag-and-drop for flexibility
- Used blur effects for modern look
- Maintained accessibility

### 2. Settings System
- Comprehensive customization
- Persistent storage
- Default value management
- Type safety

### 3. LLM Integration
- Multiple model support
- Prompt template system
- Response parsing
- Error handling

## Common Patterns

### State Management
```typescript
// Settings state example
interface SettingsState {
  model: ModelConfig;
  prompts: Record<string, string>;
  appearance: AppearanceConfig;
}

// Use context for global state
const SettingsContext = React.createContext<SettingsState>(defaultSettings);
```

### Component Structure
```typescript
// Standard component template
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = (props) => {
  // Implementation
};
```

### Error Handling
```typescript
try {
  // Operation
} catch (error) {
  // Error handling
  console.error('Operation failed:', error);
  // User notification
}
```

## Testing Strategy

1. Unit Tests
   - Component testing
   - Service testing
   - Utility function testing

2. Integration Tests
   - Settings system
   - LLM integration
   - Response handling

3. E2E Tests
   - User flows
   - Settings persistence
   - Error scenarios
```
