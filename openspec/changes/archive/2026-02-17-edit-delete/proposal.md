# Edit-Delete Feature Proposal

## Why

Users currently cannot modify or remove entries after recording them. This creates frustration when:
- Typos need to be corrected
- Tags were incorrectly assigned
- Entries were created by mistake and should be removed

Allowing edit and delete operations makes the timeline more flexible and forgiving, encouraging users to record their achievements without fear of mistakes.

## What Changes

### Edit Capability
- Click on timeline items to enter edit mode
- Inline editing interface for text modification
- Tag modification with existing tag selection UI
- Save button to commit changes, cancel to discard
- Update timeline immediately after save

### Delete Capability
- Delete button (trash icon) on each timeline item
- Hover to reveal or always visible (based on design consistency)
- Confirmation dialog before deletion
- Immediate timeline update after confirmation

### Store API Extensions
- `Store.updateEntry(id, data)` - Update existing entry
- `Store.deleteEntry(id)` - Remove entry from storage

### Event System Extensions
- `entryUpdated` event fired after successful update
- `entryDeleted` event fired after successful deletion

## Capabilities

### New Capabilities
- `entry-editing`: Inline editing of timeline entries including text and tags with save/cancel controls
- `entry-deletion`: Delete timeline entries with confirmation dialog and immediate UI update

### Modified Capabilities
- `timeline-view`: Add edit/delete buttons to timeline items and handle edit mode UI

## Impact

### Files to Create
- `js/edit-delete.js` - Edit and delete logic module

### Files to Modify
- `js/store.js` - Add `updateEntry()` and `deleteEntry()` methods
- `js/timeline-view.js` - Add edit/delete buttons, handle edit mode rendering
- `styles/main.css` - Add styles for edit mode, delete button, and confirmation dialog

### Dependencies
- Relies on existing Store module for data persistence
- Uses existing tag system for tag selection in edit mode
- Follows existing event system patterns (CustomEvent)

### Non-Breaking Changes
- All changes are additive
- Existing entries will continue to display normally
- No migration needed for existing data
