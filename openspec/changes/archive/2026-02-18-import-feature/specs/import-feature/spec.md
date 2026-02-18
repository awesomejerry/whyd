## ADDED Requirements

### Requirement: User can select file for import
The system SHALL allow users to select a JSON file from their device using a file picker.

#### Scenario: User clicks import button
- **WHEN** user clicks the import button in the modal
- **THEN** system opens a file picker dialog filtered to JSON files

#### Scenario: User cancels file selection
- **WHEN** user cancels the file picker dialog
- **THEN** system returns to import modal without changes

### Requirement: System validates import file format
The system SHALL validate the selected file before processing.

#### Scenario: Valid JSON file selected
- **WHEN** user selects a valid WHYD export JSON file
- **THEN** system reads the file and displays preview with entry count

#### Scenario: Invalid JSON format
- **WHEN** user selects a file that is not valid JSON
- **THEN** system displays error message "檔案格式錯誤，請選擇有效的 JSON 檔案"

#### Scenario: Missing entries array
- **WHEN** JSON file does not contain entries array
- **THEN** system displays error message "檔案格式不正確，缺少 entries 資料"

#### Scenario: File too large
- **WHEN** selected file exceeds 5MB
- **THEN** system displays error message "檔案過大，請選擇小於 5MB 的檔案"

### Requirement: User can preview import data
The system SHALL show a preview of data before import.

#### Scenario: Preview shows entry count
- **WHEN** valid file is selected
- **THEN** system displays "將匯入 X 筆記錄" where X is the number of entries

#### Scenario: Preview shows tag information
- **WHEN** valid file with tags is selected
- **THEN** system displays which tags will be imported or created

### Requirement: User can choose import mode
The system SHALL provide two import modes: merge and replace.

#### Scenario: Merge mode selected
- **WHEN** user selects merge mode and confirms import
- **THEN** imported entries are added to existing entries without removing current data

#### Scenario: Replace mode selected
- **WHEN** user selects replace mode and confirms import
- **THEN** system shows confirmation dialog
- **AND** after confirmation, all existing entries are replaced with imported entries

#### Scenario: Replace mode cancelled
- **WHEN** user clicks cancel on replace confirmation dialog
- **THEN** system returns to import modal without making changes

### Requirement: System auto-creates missing tags
The system SHALL automatically create tags that do not exist in current data.

#### Scenario: Import entry with new tag
- **WHEN** imported entry contains tag ID not in current tags
- **THEN** system creates new tag with matching ID and default color

#### Scenario: Import with existing tags
- **WHEN** imported entry contains tag ID that exists
- **THEN** system uses existing tag without duplication

### Requirement: System handles import errors gracefully
The system SHALL handle errors during import process.

#### Scenario: Import succeeds
- **WHEN** import completes successfully
- **THEN** system displays success message "成功匯入 X 筆記錄"
- **AND** modal closes after 1.5 seconds

#### Scenario: Import fails during processing
- **WHEN** an unexpected error occurs during import
- **THEN** system displays error message "匯入失敗，請重試"
- **AND** existing data remains unchanged

### Requirement: Import modal UI follows theme guidelines
The system SHALL use CSS variables for all colors in the import modal.

#### Scenario: Import modal in light theme
- **WHEN** import modal is displayed in light theme
- **THEN** all colors use CSS variables (--text, --surface, --border, etc.)

#### Scenario: Import modal in dark theme
- **WHEN** import modal is displayed in dark theme
- **THEN** all colors adapt automatically via CSS variables
