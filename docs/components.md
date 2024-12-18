```markdown
# Component Documentation

## 1. MainLayout

**Description:**
Provides the overall layout structure for the application, including the `TopBar`, optional `SidePanel`, and main content area. It handles the display of the floating interface and manages the settings panel visibility.

**Props:**

-   `modelConfig`: (ModelConfig) The current model configuration.
-   `onMetricsUpdate`: (metrics: PerformanceMetrics) => void) Callback function to update performance metrics.
-   `onSettingsChange`: (config: ModelConfig) => void) Callback function to update model configuration.

**State:**

-   `isSettingsOpen`: (boolean) Controls the visibility of the settings panel.
-   `segments`: (ResponseSegment[]) Stores the generated response segments.

**Functionality:**

-   Renders the `TopBar`, `SidePanel` (if enabled), and the main content area.
-   Handles the generation of ideas using the `ModelService` based on user input.
-   Passes generated segments to the `ResponseDisplay` component.
-   Manages the visibility of the `SettingsPanel`.

## 2. TopBar

**Description:**
Displays the application title, navigation elements, performance metrics, and a settings button.

**Props:**

-   `metrics`: (PerformanceMetrics | null) The current performance metrics to display.
-   `modelConfig`: (ModelConfig) The current model configuration.
-   `onSettingsClick`: () => void) Callback function to open the settings panel.

**Functionality:**

-   Displays the application title.
-   Optionally shows performance metrics (words per minute, word count).
-   Displays the currently selected model.
-   Provides a button to open the settings panel.

## 3. SidePanel (Future)

**Description:**
A collapsible side panel for managing projects, plans, and potentially other features like knowledge base access.

**Props:**

-   `open`: (boolean) Controls the visibility of the side panel.
-   `onClose`: () => void) Callback function to close the side panel.
-   `plan`: (Plan) The current project plan.
-   `onPlanUpdate`: (plan: Plan) => void) Callback function to update the project plan.

**Functionality:**

-   Displays a list of projects.
-   Allows creating, editing, and deleting projects.
-   Provides a view for managing the current project plan (when implemented).

## 4. FloatingInterface/FloatingContainer

**Description:**
A draggable, resizable container that houses the core interaction components (input, response display).

**Props:**

-   `children`: (React.ReactNode) The content to be displayed inside the container.
-   `onSettingsOpen`: () => void) Callback function to open the settings panel.

**State:**

-   `isMinimized`: (boolean) Controls whether the container is minimized.
-   `position`: ({ x: number, y: number }) The position of the container on the screen.

**Functionality:**

-   Allows dragging the container within the viewport.
-   Provides minimize/maximize functionality.
-   Saves and restores the container's position in local storage.

## 5. Input/IdeaInput

**Description:**
Provides a text input area for users to enter their ideas and prompts.

**Props:**

-   `onSubmit`: (input: string) => Promise<void>) Callback function to handle the submission of user input.
-   `onSuggestion`: () => void) Callback function to trigger a suggestion (optional).

**State:**

-   `input`: (string) The current text input value.
-   `isLoading`: (boolean) Indicates whether the application is currently processing the input.

**Functionality:**

-   Captures user input.
-   Provides a button to trigger the generation process.
-   Handles "Enter" key press to submit.
-   Optionally provides a button to trigger a suggestion.

## 6. FloatingInterface/ResponseDisplay

**Description:**
Displays the segmented responses generated by the LLM.

**Props:**

-   `segments`: (ResponseSegment[]) An array of response segments to display.
-   `onAddSegment`: (segment: ResponseSegment) => void) Callback function to handle adding a segment to the plan.

**Functionality:**

-   Renders each segment as a separate card.
-   Displays segment content, type, and metadata.
-   Provides a button to add a segment to the plan.
-   Uses `Fade` animation for smooth appearance of new segments.

## 7. Settings/SettingsPanel

**Description:**
Provides a panel for managing application settings, including model configuration, prompt settings, appearance, integrations, and advanced options.

**Props:**

-   `open`: (boolean) Controls the visibility of the settings panel.
-   `onClose`: () => void) Callback function to close the settings panel.
-   `onSettingsChange`: (config: ModelConfig) => void) Callback function to update settings.

**Functionality:**

-   Organizes settings into different sections using tabs.
-   Provides UI elements for modifying settings.
-   Handles saving and restoring default settings.

## 8. Settings/Sections/*

**Description:**
Individual settings sections:

-   `ModelSettings`: Configures LLM connection (Ollama/External), model selection, and parameters.
-   `PromptSettings`: Allows customization of prompt templates for different contexts.
-   `AppearanceSettings`: Controls the visual appearance (theme, colors, transparency).
-   `IntegrationSettings`: Manages connections to external services (e.g., design tools, webhooks).
-   `AdvancedSettings`: Provides options for debugging, performance tracking, and local storage.
```
