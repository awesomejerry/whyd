## MODIFIED Requirements

### Requirement: Export Modal UI
The system SHALL display an export/import modal when user clicks the "匯出/匯入" button in the footer.

#### Scenario: Open export modal
- **WHEN** user clicks the "匯出/匯入" button in footer
- **THEN** system displays export/import modal with tab navigation for export and import options

#### Scenario: Close export modal
- **WHEN** user clicks outside modal or cancel button
- **THEN** system hides the export/import modal

#### Scenario: Switch between export and import
- **WHEN** user clicks the import tab
- **THEN** system displays import interface with file selection

## ADDED Requirements

### Requirement: Tab Navigation in Modal
The system SHALL provide tab navigation between export and import functionality.

#### Scenario: Export tab selected by default
- **WHEN** export/import modal opens
- **THEN** export tab is active and displays export options

#### Scenario: Switch to import tab
- **WHEN** user clicks the import tab
- **THEN** system displays import interface with file picker
