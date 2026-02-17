# Entry Deletion Specification

## ADDED Requirements

### Requirement: User can delete entry
The system SHALL provide a delete button on each timeline item to allow entry removal.

#### Scenario: Delete button is visible
- **WHEN** user views timeline entries
- **THEN** a delete button (trash icon) is visible on each entry card

#### Scenario: Delete button uses danger color
- **WHEN** user views delete button
- **THEN** the button uses the danger color (--danger) to indicate destructive action

### Requirement: Delete confirmation dialog
The system SHALL display a confirmation dialog before deleting an entry.

#### Scenario: Click delete shows confirmation
- **WHEN** user clicks the delete button on an entry
- **THEN** a confirmation dialog appears
- **AND** the dialog shows warning message "確定要刪除此記錄嗎？"
- **AND** the dialog shows "此操作無法復原" warning

#### Scenario: Confirmation dialog has cancel option
- **WHEN** confirmation dialog is displayed
- **THEN** a cancel button is visible and enabled

#### Scenario: Confirmation dialog has confirm option
- **WHEN** confirmation dialog is displayed
- **THEN** a confirm (delete) button is visible and styled with danger color

### Requirement: Confirm deletion removes entry
The system SHALL remove the entry from storage when user confirms deletion.

#### Scenario: Confirm deletion
- **WHEN** user clicks confirm button in deletion dialog
- **THEN** entry is removed from storage
- **AND** entryDeleted event is fired with entry ID
- **AND** timeline refreshes without the deleted entry

#### Scenario: Delete updates timeline immediately
- **WHEN** entry is deleted
- **THEN** timeline re-renders without the deleted entry
- **AND** no page reload is required

### Requirement: Cancel deletion preserves entry
The system SHALL preserve the entry when user cancels deletion.

#### Scenario: Cancel deletion via button
- **WHEN** user clicks cancel button in deletion dialog
- **THEN** dialog closes
- **AND** entry remains in timeline
- **AND** no changes are made to storage

#### Scenario: Cancel deletion via overlay click
- **WHEN** user clicks outside the confirmation dialog
- **THEN** dialog closes
- **AND** entry remains in timeline

#### Scenario: Cancel deletion via Escape key
- **WHEN** user presses Escape key while dialog is open
- **THEN** dialog closes
- **AND** entry remains in timeline

### Requirement: Store API for entry deletion
The Store module SHALL provide a deleteEntry method for removing entries.

#### Scenario: Delete entry via Store
- **WHEN** Store.deleteEntry(id) is called
- **THEN** entry with matching ID is removed from storage
- **AND** deleted entry is returned

#### Scenario: Delete non-existent entry
- **WHEN** Store.deleteEntry is called with invalid ID
- **THEN** null is returned
- **AND** no changes are made to storage

### Requirement: Delete preserves other entries
The system SHALL ensure deletion of one entry does not affect other entries.

#### Scenario: Delete single entry from multiple
- **WHEN** user deletes one entry from timeline with multiple entries
- **THEN** only the selected entry is removed
- **AND** all other entries remain unchanged

#### Scenario: Delete from filtered view
- **WHEN** timeline is filtered by tag
- **AND** user deletes an entry
- **THEN** entry is deleted from storage (not just filtered view)
- **AND** timeline updates correctly

### Requirement: Entry deleted event
The system SHALL fire an entryDeleted event when an entry is successfully deleted.

#### Scenario: Event fired on deletion
- **WHEN** entry is successfully deleted
- **THEN** window.dispatchEvent is called with CustomEvent 'entryDeleted'
- **AND** event.detail contains { id: deletedEntryId }

#### Scenario: Other modules can listen to deletion
- **WHEN** module adds event listener for 'entryDeleted'
- **THEN** listener receives event with deleted entry ID
