# keyboard-shortcuts Specification

## Purpose
提供全域鍵盤快捷鍵支援，讓使用者能快速執行常見操作，提升工作效率。

## Requirements

### Requirement: Global keyboard event listener
The system SHALL register a global keyboard event listener to capture keyboard shortcuts across the application.

#### Scenario: Listener registered on initialization
- **WHEN** the application initializes
- **THEN** the system SHALL register a `keydown` event listener on the document
- **AND** the listener SHALL be active throughout the application lifecycle

#### Scenario: Shortcuts work from any focus state
- **WHEN** user is not focused on an input field
- **THEN** keyboard shortcuts SHALL be captured and processed

### Requirement: Focus input shortcut
The system SHALL provide a shortcut to focus the main input field.

#### Scenario: Ctrl/Cmd + N focuses input
- **WHEN** user presses Ctrl+N (Windows/Linux) or Cmd+N (Mac) outside of input fields
- **THEN** the main input field SHALL receive focus
- **AND** the system SHALL display visual feedback

#### Scenario: Shortcut ignored in input fields
- **WHEN** user presses Ctrl/Cmd + N while focused on an input field
- **THEN** the shortcut SHALL NOT trigger
- **AND** default browser behavior MAY occur

### Requirement: Show help panel shortcut
The system SHALL provide shortcuts to display the keyboard shortcuts help panel.

#### Scenario: Ctrl/Cmd + / shows help panel
- **WHEN** user presses Ctrl+/ (Windows/Linux) or Cmd+/ (Mac) outside of input fields
- **THEN** the help panel SHALL be displayed
- **AND** the help panel SHALL show all available shortcuts

#### Scenario: Question mark shows help panel
- **WHEN** user presses the ? key outside of input fields
- **THEN** the help panel SHALL be displayed

### Requirement: Escape key functionality
The system SHALL use the Escape key to cancel current operations or close overlays.

#### Scenario: Escape closes help panel
- **WHEN** the help panel is visible AND user presses Escape
- **THEN** the help panel SHALL be closed

#### Scenario: Escape closes export modal
- **WHEN** the export modal is visible AND user presses Escape
- **THEN** the export modal SHALL be closed

#### Scenario: Escape cancels editing
- **WHEN** an entry is being edited AND user presses Escape
- **THEN** the edit mode SHALL be cancelled
- **AND** the original content SHALL be restored

### Requirement: Export shortcut
The system SHALL provide a shortcut to open the export feature.

#### Scenario: Ctrl/Cmd + E opens export
- **WHEN** user presses Ctrl+E (Windows/Linux) or Cmd+E (Mac) outside of input fields
- **THEN** the export modal SHALL be displayed
- **AND** the system SHALL display visual feedback

### Requirement: Statistics shortcut
The system SHALL provide a shortcut to toggle the statistics section.

#### Scenario: Ctrl/Cmd + S toggles statistics
- **WHEN** user presses Ctrl+S (Windows/Linux) or Cmd+S (Mac) outside of input fields
- **THEN** the statistics section SHALL be toggled (shown if hidden, hidden if shown)
- **AND** the system SHALL display visual feedback

### Requirement: Help panel display
The system SHALL display a modal help panel showing all available keyboard shortcuts.

#### Scenario: Help panel structure
- **WHEN** the help panel is displayed
- **THEN** the panel SHALL list all available shortcuts with their key combinations
- **AND** the panel SHALL show the function of each shortcut
- **AND** the panel SHALL be displayed as a modal overlay

#### Scenario: Help panel close on outside click
- **WHEN** the help panel is visible AND user clicks outside the panel content
- **THEN** the help panel SHALL be closed

#### Scenario: Help panel close on Escape
- **WHEN** the help panel is visible AND user presses Escape
- **THEN** the help panel SHALL be closed

### Requirement: Visual feedback on shortcut trigger
The system SHALL provide visual feedback when a keyboard shortcut is successfully triggered.

#### Scenario: Flash effect on shortcut
- **WHEN** a keyboard shortcut is successfully triggered
- **THEN** the system SHALL display a brief visual flash effect
- **AND** the flash duration SHALL be between 100ms and 500ms

### Requirement: Input field exclusion
The system SHALL NOT trigger keyboard shortcuts when the user is focused on input fields.

#### Scenario: Shortcuts ignored in text input
- **WHEN** user is focused on an `<input>` or `<textarea>` element
- **THEN** keyboard shortcuts (except Escape) SHALL NOT trigger
- **AND** normal text input behavior SHALL be preserved

#### Scenario: Shortcuts ignored in contenteditable
- **WHEN** user is focused on an element with `contenteditable="true"`
- **THEN** keyboard shortcuts (except Escape) SHALL NOT trigger
