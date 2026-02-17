## ADDED Requirements

### Requirement: Theme initialization
The system SHALL initialize theme based on stored preference or default to dark theme.

#### Scenario: No stored preference
- **WHEN** user visits the app for the first time
- **THEN** system sets theme to dark (data-theme="dark" or no attribute)

#### Scenario: Stored preference exists
- **WHEN** user visits the app with a stored preference
- **THEN** system applies the stored theme immediately before page render

### Requirement: Theme toggle button
The system SHALL provide a theme toggle button in the footer.

#### Scenario: Display toggle button
- **WHEN** app loads
- **THEN** a theme toggle button with sun/moon icon is visible in footer

#### Scenario: Current theme indicator
- **WHEN** current theme is dark
- **THEN** button shows sun icon (☀️)
- **WHEN** current theme is light
- **THEN** button shows moon icon (🌙)

### Requirement: Theme switching
The system SHALL switch between dark and light themes when toggle button is clicked.

#### Scenario: Switch to light theme
- **WHEN** user clicks toggle button while in dark theme
- **THEN** system switches to light theme (data-theme="light")
- **AND** button icon changes to moon (🌙)
- **AND** preference is saved to localStorage

#### Scenario: Switch to dark theme
- **WHEN** user clicks toggle button while in light theme
- **THEN** system switches to dark theme (data-theme="dark" or removes attribute)
- **AND** button icon changes to sun (☀️)
- **AND** preference is saved to localStorage

### Requirement: Smooth theme transition
The system SHALL provide smooth visual transition when switching themes.

#### Scenario: Transition animation
- **WHEN** theme is switched
- **THEN** background, text, and surface colors transition smoothly over 0.3 seconds

### Requirement: Preference persistence
The system SHALL persist theme preference across sessions.

#### Scenario: Save preference
- **WHEN** user changes theme
- **THEN** preference is saved to localStorage key "theme"

#### Scenario: Handle localStorage unavailable
- **WHEN** localStorage is not available
- **THEN** system still allows theme switching but does not persist
- **AND** no error is thrown
