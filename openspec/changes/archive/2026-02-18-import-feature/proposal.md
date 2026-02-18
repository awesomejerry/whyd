## Why

WHYD currently supports data export but lacks import functionality. Users cannot restore their data from backups or migrate data between devices. Adding import capability completes the backup/restore cycle and enables data portability.

## What Changes

- New import functionality to read JSON files exported by WHYD
- File picker UI for selecting import files
- Preview before import showing record count
- Two import modes: merge (add to existing) and replace (clear existing)
- Error handling for invalid formats and oversized files
- Automatic tag creation for imported entries with unknown tags
- Rename export-modal to export-import-modal, update footer button to "匯出/匯入"

## Capabilities

### New Capabilities
- `import-feature`: JSON file import with preview, merge/replace modes, error handling, and automatic tag creation

### Modified Capabilities
- `export-feature`: UI integration - modal and footer button updated to include import functionality

## Impact

- New file: `js/import-feature.js`
- Modified: `index.html` (modal HTML, footer button, script tag)
- Modified: `styles/main.css` (import modal styles)
- Modified: `js/export-feature.js` (modal renamed, import button added)
- Integration with `Store` module for data persistence
- FileReader API for file reading
