# Design: Edit-Delete Feature

## Context

The WHYD app currently supports adding entries to a timeline but lacks modification capabilities. Users need to:
- Correct typos or mistakes in entry text
- Adjust tag assignments after initial creation
- Remove entries that were added in error

The app uses a modular JavaScript architecture with:
- **Store module** (js/store.js) for localStorage persistence
- **TimelineView module** (js/timeline-view.js) for rendering entries
- **Event system** using CustomEvent for cross-module communication
- **CSS design system** with CSS variables for consistent styling

## Goals / Non-Goals

**Goals:**
- Enable inline editing of entry text and tags
- Provide safe deletion with confirmation
- Maintain UI consistency with existing design patterns
- Ensure edit/delete operations are intuitive and reversible

**Non-Goals:**
- Edit/delete via external API (this is a client-only feature)
- Bulk operations (edit/delete multiple entries at once)
- Undo functionality beyond cancel in edit mode
- Edit/delete history tracking

## Decisions

### 1. Edit Mode UI: Inline Editing (Not Modal)

**Decision:** Use inline editing within the timeline card.

**Rationale:**
- Inline editing is faster and more intuitive for small changes
- Reduces context switching compared to modal dialogs
- Consistent with modern mobile app patterns
- Simpler implementation with fewer moving parts

**Alternatives Considered:**
- Modal dialog: More complex, requires more clicks, but provides better focus
- Separate edit page: Breaks user flow, too heavyweight for simple text edits

### 2. Delete Button: Always Visible with Confirmation

**Decision:** Show delete button (trash icon) always visible on timeline items, with confirmation dialog before deletion.

**Rationale:**
- Always visible is more discoverable than hover-only on mobile
- Confirmation dialog prevents accidental deletion
- Matches existing modal pattern (export modal already in codebase)
- Visual consistency with the danger color (--danger: #ef4444)

**Alternatives Considered:**
- Hover to reveal: Not mobile-friendly, less discoverable
- Swipe to delete: Requires gesture library, less obvious to users
- No confirmation: Too risky for destructive action

### 3. Tag Editing: Reuse Existing Tag System

**Decision:** Reuse the existing TagSystem component for tag selection in edit mode.

**Rationale:**
- Consistent UI with entry creation flow
- No need to duplicate tag selection logic
- Tags already have visual feedback (selected state)
- Simpler maintenance

**Implementation:**
- When editing, show tag pills within the edit card
- Pre-select current tags
- Save new tag selection on submit

### 4. Module Structure: Dedicated EditDelete Module

**Decision:** Create a new EditDelete module (js/edit-delete.js) to handle edit/delete logic.

**Rationale:**
- Separation of concerns keeps TimelineView focused on rendering
- Easier to test and maintain edit/delete logic independently
- Follows existing module pattern in the codebase
- Can listen to events and coordinate between Store and TimelineView

**Module Responsibilities:**
- Manage edit mode state (which entry is being edited)
- Handle edit form submission
- Show/hide delete confirmation dialog
- Emit events for successful operations

### 5. Event System: New Events for Update/Delete

**Decision:** Add new custom events: `entryUpdated` and `entryDeleted`.

**Rationale:**
- Follows existing event pattern (`entryAdded`, `tag-selected`)
- Allows other modules to react to changes
- Decouples edit/delete logic from timeline rendering
- Consistent with event-driven architecture

**Event Payloads:**
```javascript
// entryUpdated event
{ detail: { entry: { id, text, tags, createdAt } } }

// entryDeleted event  
{ detail: { id: entryId } }
```

### 6. Store API: Add CRUD Methods

**Decision:** Extend Store with `updateEntry(id, data)` and `deleteEntry(id)` methods.

**Rationale:**
- Encapsulates data manipulation logic
- Maintains single source of truth pattern
- Easy to add validation or side effects later
- Consistent with existing Store API style

**API Design:**
```javascript
Store.updateEntry(id, { text, tags })
  // Returns updated entry or null if not found

Store.deleteEntry(id)
  // Returns deleted entry or null if not found
```

## Risks / Trade-offs

### Risk 1: Accidental Data Loss
**Risk:** Users might confirm deletion by mistake.
**Mitigation:** 
- Use clear, prominent cancel button in confirmation dialog
- Use danger color for confirm button to indicate destructive action
- Add descriptive text "此操作無法復原" (This action cannot be undone)

### Risk 2: Edit Mode Confusion
**Risk:** Users might not understand how to enter/exit edit mode.
**Mitigation:**
- Use intuitive edit icon (pencil) on timeline cards
- Clear visual distinction between view and edit modes
- Save and Cancel buttons clearly labeled
- Click outside or Escape key to cancel edit

### Risk 3: Concurrent Edits (Edge Case)
**Risk:** Multiple browser tabs editing same entry.
**Mitigation:** 
- Accept this limitation (localStorage doesn't support locking)
- Last write wins (common pattern for localStorage apps)
- Low probability issue for single-user app

### Risk 4: Performance with Many Entries
**Risk:** Timeline re-render after every edit/delete could be slow.
**Mitigation:**
- Current timeline already re-renders on entryAdded
- User is unlikely to have thousands of entries
- Can optimize later with partial updates if needed

## Migration Plan

**Phase 1: Add Store Methods**
1. Add `updateEntry(id, data)` to Store
2. Add `deleteEntry(id)` to Store
3. Test with console commands

**Phase 2: Create EditDelete Module**
1. Create js/edit-delete.js
2. Implement edit mode state management
3. Implement delete confirmation dialog
4. Wire up events

**Phase 3: Update TimelineView**
1. Add edit button to timeline cards
2. Add delete button to timeline cards
3. Add edit mode rendering (text input + tag selection)
4. Bind click handlers to EditDelete module

**Phase 4: Add CSS Styles**
1. Add edit mode styles
2. Add delete button styles
3. Add confirmation dialog styles
4. Test responsive design

**Rollback Strategy:**
- Each phase can be reverted independently
- Store methods are additive (no breaking changes)
- EditDelete module can be disabled by removing script tag
- CSS changes are additive

## Open Questions

None - design is complete and ready for implementation.
