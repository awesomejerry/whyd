# entry-editing Specification

## Purpose
TBD - created by archiving change edit-delete. Update Purpose after archive.
## Requirements
### Requirement: User can enter edit mode
The system SHALL allow users to enter edit mode by clicking an edit button on timeline items.

#### Scenario: Enter edit mode from timeline
- **WHEN** user clicks the edit button (pencil icon) on a timeline card
- **THEN** the timeline card switches to edit mode showing editable text input and tag selection

#### Scenario: Only one entry in edit mode at a time
- **WHEN** user clicks edit button on entry A while entry B is already in edit mode
- **THEN** entry B exits edit mode and entry A enters edit mode

### Requirement: User can modify entry text
The system SHALL provide a text input field in edit mode pre-populated with the current entry text.

#### Scenario: Edit text content
- **WHEN** user modifies the text in the edit input field
- **THEN** the modified text is ready to be saved

#### Scenario: Text input preserves original formatting
- **WHEN** user enters edit mode
- **THEN** the text input field displays the exact original text without HTML encoding

### Requirement: User can modify entry tags
The system SHALL display tag selection UI in edit mode with currently assigned tags pre-selected.

#### Scenario: View current tags in edit mode
- **WHEN** user enters edit mode
- **THEN** all tags currently assigned to the entry are shown in selected state

#### Scenario: Modify tag selection
- **WHEN** user clicks on a tag pill in edit mode
- **THEN** the tag selection toggles (selected becomes unselected, unselected becomes selected)

#### Scenario: Tag selection uses existing tag system
- **WHEN** user modifies tags in edit mode
- **THEN** the tag selection UI and behavior is consistent with the new entry tag selection

### Requirement: User can save edited entry
The system SHALL provide a save button to commit changes to the entry.

#### Scenario: Save successful edit
- **WHEN** user clicks save button after making changes
- **THEN** entry is updated in storage
- **AND** timeline refreshes to show updated entry
- **AND** entryUpdated event is fired with updated entry data

#### Scenario: Save with no changes
- **WHEN** user clicks save button without modifying text or tags
- **THEN** entry remains unchanged
- **AND** edit mode exits

#### Scenario: Save clears validation errors
- **WHEN** user fixes validation error and clicks save
- **THEN** entry is saved successfully
- **AND** edit mode exits

### Requirement: User can cancel edit
The system SHALL provide a cancel button to discard changes and exit edit mode.

#### Scenario: Cancel edit discards changes
- **WHEN** user modifies entry text or tags
- **AND** user clicks cancel button
- **THEN** all changes are discarded
- **AND** original entry is restored
- **AND** edit mode exits

#### Scenario: Cancel with keyboard
- **WHEN** user presses Escape key while in edit mode
- **THEN** changes are discarded
- **AND** edit mode exits

### Requirement: Entry text validation
The system SHALL validate entry text before allowing save.

#### Scenario: Empty text is rejected
- **WHEN** user clears all text and clicks save
- **THEN** error message "內容不能為空" is displayed
- **AND** edit mode remains active

#### Scenario: Whitespace-only text is rejected
- **WHEN** user enters only spaces/tabs and clicks save
- **THEN** error message "內容不能為空" is displayed
- **AND** edit mode remains active

### Requirement: Entry update preserves metadata
The system SHALL preserve entry metadata during updates.

#### Scenario: Created timestamp is preserved
- **WHEN** user saves edited entry
- **THEN** the createdAt timestamp remains unchanged

#### Scenario: Entry ID is preserved
- **WHEN** user saves edited entry
- **THEN** the entry ID remains the same

### Requirement: Store API for entry updates
The Store module SHALL provide an updateEntry method for modifying entries.

#### Scenario: Update entry via Store
- **WHEN** Store.updateEntry(id, { text, tags }) is called
- **THEN** the entry with matching ID is updated
- **AND** updated entry is returned

#### Scenario: Update non-existent entry
- **WHEN** Store.updateEntry is called with invalid ID
- **THEN** null is returned
- **AND** no changes are made to storage

