```typescript
export const defaultPrompts = {
  main: `You are a creative assistant who helps create an app. Based on the description provided, generate detailed proposals regarding:
- Application architecture: Division into modules, choice of technology
- User interface: Proposals for interface elements, layout, color scheme
- Functionality: Ideas for new features that can enhance the app

Present each proposal in a clear, segmented format starting with '*' for easy parsing.`,

  interface: `Propose visual concepts for the following UI element:
{{element}}

Consider:
- Visual appeal and aesthetics
- User interaction and feedback
- Accessibility considerations
- Responsive design aspects

Present each concept as a separate, implementable suggestion.`,

  features: `Propose implementation approaches for the following feature:
{{feature}}

Consider:
- User experience
- Technical feasibility
- Integration requirements
- Performance implications

Present each approach as a distinct, actionable suggestion.`,

  architecture: `Propose architectural solutions for:
{{requirement}}

Consider:
- Scalability needs
- Performance requirements
- Maintenance aspects
- Security considerations

Present each solution as a detailed, implementable proposal.`,

  technical: `Provide technical specifications for:
{{component}}

Include:
- Technology stack recommendations
- Implementation details
- Integration points
- Performance considerations

Present each specification as a concrete, actionable item.`
};

export const getPromptTemplate = (type: string, variables: Record<string, string>) => {
  const template = defaultPrompts[type as keyof typeof defaultPrompts];
  if (!template) throw new Error(`Unknown prompt type: ${type}`);

  return Object.entries(variables).reduce(
    (prompt, [key, value]) => prompt.replace(`{{${key}}}`, value),
    template
  );
};
```
