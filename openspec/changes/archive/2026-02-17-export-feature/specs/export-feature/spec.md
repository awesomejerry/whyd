## ADDED Requirements

### Requirement: Export Modal UI
The system SHALL display an export modal when user clicks the 📤 button in the footer.

#### Scenario: Open export modal
- **WHEN** user clicks the 📤 button in footer
- **THEN** system displays export modal with format selection and date range options

#### Scenario: Close export modal
- **WHEN** user clicks outside modal or cancel button
- **THEN** system hides the export modal

### Requirement: Format Selection
The system SHALL allow users to select export format between JSON and CSV.

#### Scenario: Default format selection
- **WHEN** export modal opens
- **THEN** JSON format is selected by default

#### Scenario: Change format
- **WHEN** user selects CSV format
- **THEN** system updates selected format to CSV

### Requirement: Date Range Filter
The system SHALL allow users to filter entries by date range.

#### Scenario: Export all entries
- **WHEN** user does not specify date range
- **THEN** system exports all entries

#### Scenario: Export entries within date range
- **WHEN** user specifies start date and end date
- **THEN** system exports only entries created within the specified range

### Requirement: JSON Export
The system SHALL export data in JSON format preserving full data structure.

#### Scenario: JSON export includes all fields
- **WHEN** user exports as JSON
- **THEN** exported file contains entries with id, text, tags, and createdAt fields

### Requirement: CSV Export
The system SHALL export data in CSV format with proper escaping.

#### Scenario: CSV export format
- **WHEN** user exports as CSV
- **THEN** exported file has header row with columns: id,text,tags,createdAt

#### Scenario: CSV special character handling
- **WHEN** entry text contains commas, quotes, or newlines
- **THEN** system properly escapes the text in CSV format

### Requirement: File Download
The system SHALL download the exported file using browser's download mechanism.

#### Scenario: Download JSON file
- **WHEN** user clicks export with JSON format selected
- **THEN** system downloads file named "whyd-export-YYYYMMDD.json"

#### Scenario: Download CSV file
- **WHEN** user clicks export with CSV format selected
- **THEN** system downloads file named "whyd-export-YYYYMMDD.csv"

### Requirement: Export Feedback
The system SHALL provide feedback after export attempt.

#### Scenario: Export success
- **WHEN** export completes successfully
- **THEN** system displays success message

#### Scenario: Export failure
- **WHEN** export fails due to error
- **THEN** system displays error message
