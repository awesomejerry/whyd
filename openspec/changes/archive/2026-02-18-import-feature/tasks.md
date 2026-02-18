## 1. Module Setup

- [x] 1.1 Create js/import-feature.js with ImportFeature module structure (init, render, bindEvents)
- [x] 1.2 Add import-feature.js script tag to index.html (before app.js)

## 2. UI Implementation

- [x] 2.1 Update export-modal to export-import-modal with tab navigation in index.html
- [x] 2.2 Change footer button text from 📤 to "匯出/匯入"
- [x] 2.3 Add import tab HTML with file picker, preview area, mode selection, and import button
- [x] 2.4 Add CSS styles for import modal using theme variables (--text, --surface, --border, etc.)

## 3. Core Import Logic

- [x] 3.1 Implement file selection handler using FileReader API
- [x] 3.2 Implement JSON validation (check entries array, file size limit 5MB)
- [x] 3.3 Implement preview display showing entry count
- [x] 3.4 Implement merge mode - add imported entries to existing data
- [x] 3.5 Implement replace mode with confirmation dialog - clear existing and add imported
- [x] 3.6 Implement auto-create missing tags during import

## 4. Error Handling

- [x] 4.1 Handle invalid JSON format error with user-friendly message
- [x] 4.2 Handle missing entries array error
- [x] 4.3 Handle file too large error (>5MB)
- [x] 4.4 Handle unexpected import errors with rollback

## 5. Integration

- [x] 5.1 Update ExportFeature to support tab switching
- [x] 5.2 Wire ImportFeature.init() in app.js
- [x] 5.3 Test import with exported JSON files
- [x] 5.4 Verify theme compatibility (light/dark mode)
