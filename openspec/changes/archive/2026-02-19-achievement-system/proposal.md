## Why

Users need motivation and gamification to maintain consistent daily tracking habits. An achievement system provides positive reinforcement by recognizing milestones (streaks, entry counts) and encouraging exploration of all app features. This transforms WHYD from a simple tracking tool into an engaging habit-building experience.

## What Changes

- **New**: Achievement system module (`js/achievement-system.js`)
- **New**: 14 achievements across 4 categories (streak, count, usage, time)
- **New**: Achievement gallery modal with progress tracking
- **New**: Toast notification system for achievement unlocks
- **New**: Footer button (🏆) to access achievements
- **Modified**: Add achievement translations to `locales/zh-TW.json` and `locales/en.json`
- **Modified**: Add achievement CSS styles to `styles/main.css`
- **Modified**: Add achievement button and modal HTML to `index.html`
- **Modified**: Initialize AchievementSystem in `js/app.js`

## Capabilities

### New Capabilities
- `achievement-system`: Achievement definition, unlock detection, notification, and gallery display

### Modified Capabilities
- None (achievement system observes existing events, no spec-level changes required)

## Impact

- **Code**: New module `js/achievement-system.js`, updates to `app.js`, `index.html`, `main.css`, locale files
- **Store**: Adds `achievements` object to existing data structure (backward compatible)
- **Events**: Listens to existing `entryAdded`, `streakUpdated`, `languageChanged` events; emits new `achievementUnlocked` event
- **UI**: New footer button and modal; toast notifications
- **i18n**: All achievement names, descriptions, and UI text support zh-TW and en
