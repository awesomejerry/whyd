# Implementation Tasks: Edit-Delete Feature

## 1. Store API Extensions

- [x] 1.1 Add updateEntry(id, data) method to Store module
- [x] 1.2 Add deleteEntry(id) method to Store module
- [x] 1.3 Test Store methods with console commands

## 2. EditDelete Module Creation

- [x] 2.1 Create js/edit-delete.js module
- [x] 2.2 Implement edit mode state management (track which entry is being edited)
- [x] 2.3 Implement enterEditMode(entryId) function
- [x] 2.4 Implement exitEditMode() function
- [x] 2.5 Implement saveEdit(entryId) function
- [x] 2.6 Implement cancelEdit() function
- [x] 2.7 Add text validation (non-empty check)
- [x] 2.8 Implement delete confirmation dialog HTML structure
- [x] 2.9 Implement showDeleteConfirm(entryId) function
- [x] 2.10 Implement confirmDelete(entryId) function
- [x] 2.11 Wire up entryUpdated and entryDeleted events

## 3. Timeline View Updates

- [x] 3.1 Add edit button (pencil icon) to timeline card HTML
- [x] 3.2 Add delete button (trash icon) to timeline card HTML
- [x] 3.3 Add data-entry-id attribute to timeline items
- [x] 3.4 Implement edit mode rendering in TimelineView.renderEntries()
- [x] 3.5 Add event listeners for edit button clicks
- [x] 3.6 Add event listeners for delete button clicks
- [x] 3.7 Listen for entryUpdated event to refresh timeline
- [x] 3.8 Listen for entryDeleted event to refresh timeline
- [x] 3.9 Ensure only one entry can be in edit mode at a time

## 4. CSS Styling

- [x] 4.1 Add styles for edit button on timeline cards
- [x] 4.2 Add styles for delete button on timeline cards
- [x] 4.3 Add styles for edit mode form in timeline cards
- [x] 4.4 Add styles for edit mode text input
- [x] 4.5 Add styles for tag selection in edit mode
- [x] 4.6 Add styles for save and cancel buttons in edit mode
- [x] 4.7 Add styles for delete confirmation dialog
- [x] 4.8 Add error message styles for validation
- [x] 4.9 Test responsive design for edit/delete on mobile

## 5. Integration and Testing

- [x] 5.1 Add edit-delete.js script tag to index.html
- [x] 5.2 Initialize EditDelete module in app.js
- [x] 5.3 Test edit flow: enter edit, modify text, save
- [x] 5.4 Test edit flow: enter edit, modify tags, save
- [x] 5.5 Test edit flow: enter edit, cancel changes
- [x] 5.6 Test edit validation: empty text rejected
- [x] 5.7 Test delete flow: click delete, confirm
- [x] 5.8 Test delete flow: click delete, cancel
- [x] 5.9 Test timeline refresh after edit
- [x] 5.10 Test timeline refresh after delete
- [x] 5.11 Test keyboard shortcuts (Escape to cancel)
- [x] 5.12 Test with multiple entries (delete one, others remain)
- [x] 5.13 Test with tag filtering (edit/delete filtered entries)
