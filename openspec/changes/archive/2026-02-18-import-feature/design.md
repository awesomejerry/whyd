## Context

WHYD currently has an export feature (`js/export-feature.js`) that exports data as JSON with structure `{ exportedAt, entries }`. Users need import capability to restore backups or migrate data. The import feature must integrate with the existing UI (modal-based) and Store module.

## Goals / Non-Goals

**Goals:**
- Import JSON files matching WHYD export format
- Preview before import (show entry count)
- Support merge and replace modes
- Auto-create missing tags
- Handle errors gracefully (invalid format, large files)
- Integrate with existing export modal UI

**Non-Goals:**
- CSV import (not required, JSON sufficient for backup/restore)
- Incremental/partial import (all-or-nothing approach)
- Cloud sync or remote import

## Decisions

### 1. Separate ImportFeature Module
**Decision:** Create `js/import-feature.js` as a separate module rather than extending ExportFeature.
**Rationale:** Follows existing module pattern (single responsibility), easier to maintain and test independently.

### 2. Combine Modals into Export-Import Modal
**Decision:** Rename export-modal to export-import-modal, add tab-like UI for export/import.
**Rationale:** Reduces UI clutter, groups related functionality, follows user's suggestion.
**Alternative:** Separate modals - rejected as it creates more UI elements and user confusion.

### 3. File Validation Strategy
**Decision:** Validate JSON structure on client-side before processing.
- Check for `entries` array (required)
- Limit file size to 5MB (matches LocalStorage practical limit)
- Validate each entry has `text` and `createdAt`

**Rationale:** Fast feedback, prevents corrupt data from entering store.

### 4. Tag Auto-Creation
**Decision:** When importing entries with unknown tag IDs, create new tags automatically.
**Rationale:** Ensures imported data retains tag associations. Tag ID conflicts resolved by using imported tag data if available.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Large files cause UI freeze | Show loading indicator, process in chunks if >1000 entries |
| Malformed JSON crashes import | Wrap JSON.parse in try-catch, show friendly error |
| Merge creates duplicates | Entry IDs are timestamps; collision unlikely but acceptable |
| Replace mode data loss | Show confirmation dialog before replace |
