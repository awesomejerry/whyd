# ui-styles Specification

## Purpose
Design system defining CSS custom properties, component styles, layout rules, and responsive breakpoints. Ensures consistent visual language across all UI components.
TBD - created by archiving change add-theme-switching. Update Purpose after archive.
## Requirements
### Requirement: Dark theme CSS variables
The system SHALL define CSS variables for dark theme as the default.

#### Scenario: Dark theme colors
- **WHEN** no data-theme attribute or data-theme="dark"
- **THEN** the following CSS variables apply dark theme colors:
  - --bg: dark background color
  - --surface: slightly lighter surface color
  - --text: light text color
  - --text-muted: muted light text color
  - --border: subtle border color

### Requirement: Light theme CSS variables
The system SHALL define CSS variables for light theme.

#### Scenario: Light theme colors
- **WHEN** data-theme="light"
- **THEN** the following CSS variables apply light theme colors:
  - --bg: light background color
  - --surface: white surface color
  - --text: dark text color
  - --text-muted: muted dark text color
  - --border: subtle border color

