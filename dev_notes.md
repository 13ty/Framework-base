```markdown
# Quick Development Notes

## Core Features & Important Points

### Floating Interface
- Using react-draggable
- Position saved in localStorage
- Minimize state persists
- z-index: 9999 to stay on top

### LLM Integration
- Ollama endpoint: http://localhost:11434
- Backup endpoint configurable in settings
- Response timeout: 30s
- Keep prompt templates in separate config for easy updates

### Settings System
- All settings in localStorage
- Key: 'ai-app-settings'
- Default settings backup in config
- Settings can be exported/imported

### Important Fixes/Workarounds
- Add 100ms delay after drag to prevent click events
- Clear response cache on model change
- Handle long responses with virtualization
- Check Ollama connection before sending prompts

### Future Considerations
- Settings might need migration system
- Consider adding response history
- Maybe add keyboard shortcuts
- Could add multiple response layouts

### Quick Commands
```bash
# Development
yarn dev

# If dependencies issue
yarn install --force

# If TypeScript errors
yarn clean-cache && yarn dev
```

### Common Issues
- Ollama connection: Check CORS if using different port
- Long responses: Use segmentation
- UI freezing: Add loading states
- Settings reset: Check localStorage permissions
```
