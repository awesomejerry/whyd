## 1. Core i18n Module

- [x] 1.1 Create locales/zh-TW.json with Traditional Chinese translations
- [x] 1.2 Create locales/en.json with English translations
- [x] 1.3 Create js/i18n.js module with language management and translation function

## 2. Store Integration

- [x] 2.1 Add getLanguage() and setLanguage() methods to Store module
- [x] 2.2 Update Store default settings to include language: 'zh-TW'

## 3. UI Components Update

- [x] 3.1 Update index.html header text to use i18n
- [ ] 3.2 Update CoreInput placeholder to use i18n
- [ ] 3.3 Update TagSystem labels to use i18n
- [ ] 3.4 Update TimelineView empty state to use i18n
- [ ] 3.5 Update StreakTracker labels to use i18n
- [ ] 3.6 Update Onboarding text to use i18n
- [ ] 3.7 Update Statistics labels to use i18n
- [ ] 3.8 Update ExportFeature modal text to use i18n
- [ ] 3.9 Update ImportFeature modal text to use i18n
- [ ] 3.10 Update DailySummary text to use i18n
- [ ] 3.11 Update Shortcuts modal text to use i18n

## 4. Language Toggle UI

- [x] 4.1 Add language toggle button to footer in index.html
- [ ] 4.2 Add CSS styles for language toggle button in main.css
- [ ] 4.3 Implement language toggle functionality in i18n.js

## 5. App Initialization

- [x] 5.1 Load i18n module before other modules in index.html
- [ ] 5.2 Initialize i18n with saved language preference in App.init()
- [ ] 5.3 Dispatch languageChanged event on initialization

## 6. Testing

- [ ] 6.1 Test language switching between zh-TW and en
- [ ] 6.2 Test language preference persistence across page reloads
- [ ] 6.3 Test HTML lang attribute updates correctly
- [ ] 6.4 Verify all UI text displays correctly in both languages
