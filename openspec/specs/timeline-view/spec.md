# timeline-view Specification

## Purpose
TBD - created by archiving change edit-delete. Update Purpose after archive.
## Requirements
### Requirement: Timeline items show edit button
The timeline view SHALL display an edit button (pencil icon) on each timeline item.

#### Scenario: Edit button visible on timeline card
- **WHEN** user views timeline entries
- **THEN** an edit button is visible on each entry card
- **AND** edit button uses consistent iconography with app design

#### Scenario: Edit button hover state
- **WHEN** user hovers over edit button
- **THEN** visual feedback is provided (color change or scale)
- **AND** cursor changes to pointer

### Requirement: Timeline items show delete button
The timeline view SHALL display a delete button (trash icon) on each timeline item.

#### Scenario: Delete button visible on timeline card
- **WHEN** user views timeline entries
- **THEN** a delete button is visible on each entry card
- **AND** delete button uses danger color (--danger)

#### Scenario: Delete button hover state
- **WHEN** user hovers over delete button
- **THEN** visual feedback is provided
- **AND** cursor changes to pointer

### Requirement: Timeline supports edit mode rendering
The timeline view SHALL render timeline cards in edit mode when entry is being edited.

#### Scenario: Edit mode replaces view content
- **WHEN** entry enters edit mode
- **THEN** card content is replaced with edit form
- **AND** edit form includes text input and tag selection
- **AND** save and cancel buttons are visible

#### Scenario: Edit mode shows current text
- **WHEN** entry enters edit mode
- **THEN** text input is pre-filled with current entry text

#### Scenario: Edit mode shows current tags
- **WHEN** entry enters edit mode
- **THEN** current entry tags are displayed in selected state

#### Scenario: Non-edited entries remain in view mode
- **WHEN** one entry is in edit mode
- **THEN** all other entries remain in normal view mode
- **AND** edit and delete buttons remain functional on other entries

### Requirement: Timeline responds to entry update events
The timeline view SHALL re-render when entryUpdated event is fired.

#### Scenario: Timeline refreshes on entry update
- **WHEN** entryUpdated event is fired
- **THEN** timeline re-renders to show updated entry content

### Requirement: Timeline responds to entry deletion events
The timeline view SHALL re-render when entryDeleted event is fired.

#### Scenario: Timeline refreshes on entry deletion
- **WHEN** entryDeleted event is fired
- **THEN** timeline re-renders without the deleted entry

#### Scenario: Empty state shown when all entries deleted
- **WHEN** last entry is deleted
- **AND** no entries remain
- **THEN** timeline shows empty state message

### Requirement: Action buttons layout
The timeline view SHALL position edit and delete buttons consistently.

#### Scenario: Buttons positioned on card
- **WHEN** timeline card is rendered
- **THEN** edit and delete buttons are positioned in consistent location
- **AND** buttons do not overlap with content
- **AND** buttons are accessible on mobile devices

#### Scenario: Buttons do not interfere with card hover
- **WHEN** user hovers over timeline card
- **THEN** existing hover effects (shadow, transform) still work
- **AND** buttons remain clickable

### Requirement: Timeline responds to search filter events
The timeline view SHALL filter entries when search-filtered event is fired.

#### Scenario: Timeline filters on search event
- **WHEN** search-filtered event is fired with search query
- **THEN** timeline re-renders showing only matching entries
- **AND** search query is applied alongside existing tag filters

#### Scenario: Timeline shows search empty state
- **WHEN** search-filtered event results in no matches
- **THEN** timeline shows "沒有符合搜尋條件的記錄" message

#### Scenario: Timeline clears when search is empty
- **WHEN** search-filtered event is fired with empty query
- **THEN** timeline shows all entries (respecting tag filter if active)

