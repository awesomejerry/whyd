# ui-styles Specification (Delta)

## ADDED Requirements

### Requirement: Language toggle button styling
The system SHALL define CSS styles for the language toggle button.

#### Scenario: Language button base styling
- **WHEN** the language toggle button is rendered
- **THEN** the button SHALL use the same styling as other footer icon buttons
- **AND** the button SHALL use var(--text-muted) for text color
- **AND** the button SHALL use var(--surface) for background

#### Scenario: Language button hover state
- **WHEN** user hovers over the language toggle button
- **THEN** the button background SHALL change to var(--primary-light)
- **AND** the text color SHALL change to white

#### Scenario: Language indicator styling
- **WHEN** language button displays current language code
- **THEN** the language code SHALL use font-size of 10px
- **AND** the language code SHALL be uppercase
