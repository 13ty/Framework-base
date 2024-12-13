export const promptTemplates: Record<string, string> = {
  ideaGeneration: `
    Act as an expert software architect and product designer.
    Based on the following idea description, generate detailed suggestions for:
    1. Core features
    2. Technical architecture
    3. User experience considerations
    4. Potential challenges and solutions

    Idea Description: {{description}}

    Provide your response in a structured format with clear sections.
  `,

  technicalAnalysis: `
    Analyze the following technical aspect of the project:
    {{aspect}}

    Consider:
    1. Implementation complexity
    2. Scalability implications
    3. Performance considerations
    4. Security requirements
    5. Maintenance needs

    Provide specific recommendations and best practices.
  `,

  featureRefinement: `
    Help refine the following feature:
    {{feature}}

    Consider:
    1. User value
    2. Implementation effort
    3. Technical dependencies
    4. Edge cases
    5. Testing requirements

    Provide actionable suggestions for improvement.
  `,

  architectureReview: `
    Review the following architecture decision:
    {{decision}}

    Evaluate:
    1. Scalability
    2. Maintainability
    3. Performance
    4. Security
    5. Cost implications

    Suggest improvements or alternatives if applicable.
  `
};

export const getPromptTemplate = (
  templateId: string,
  variables: Record<string, string>
): string => {
  const template = promptTemplates[templateId];
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }

  return Object.entries(variables).reduce(
    (prompt, [key, value]) => prompt.replace(`{{${key}}}`, value),
    template
  );
};
