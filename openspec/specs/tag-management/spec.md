# tag-management Specification

## Purpose
TBD - created by archiving change tag-system. Update Purpose after archive.
## Requirements
### Requirement: System provides default tags
The system SHALL provide four preset tags with predefined colors: 工作(blue), 生活(green), 學習(orange), 健康(pink).

#### Scenario: Default tags initialization
- **WHEN** user first uses the tag system
- **THEN** system displays four default tags with correct colors

### Requirement: User can create custom tags
The system SHALL allow users to create new tags with custom names and auto-assigned colors.

#### Scenario: Create new tag
- **WHEN** user clicks add tag button and enters a tag name
- **THEN** system creates a new tag and displays it in the tag list

#### Scenario: Duplicate tag prevention
- **WHEN** user attempts to create a tag with an existing name
- **THEN** system ignores the duplicate and does not create a new tag

### Requirement: User can select tags for filtering
The system SHALL allow users to select one or more tags to filter timeline entries.

#### Scenario: Select single tag for filtering
- **WHEN** user clicks on an unselected tag
- **THEN** system highlights the tag and filters timeline to show only entries with that tag

#### Scenario: Select multiple tags
- **WHEN** user clicks multiple tags
- **THEN** system shows entries matching ANY of the selected tags

#### Scenario: Deselect tag
- **WHEN** user clicks on a selected tag
- **THEN** system deselects the tag and updates timeline filter

#### Scenario: Clear all filters
- **WHEN** no tags are selected
- **THEN** system displays all timeline entries

### Requirement: Tag selection syncs with input box
The system SHALL display currently selected tags in the input area for new entries.

#### Scenario: Selected tags visible in input
- **WHEN** user selects one or more tags
- **THEN** input section displays the selected tags visually

### Requirement: Tags persist in local storage
The system SHALL persist custom tags and their properties in local storage.

#### Scenario: Tags persist across sessions
- **WHEN** user closes and reopens the application
- **THEN** all custom tags are restored from local storage

