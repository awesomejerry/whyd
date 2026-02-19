## 1. Data Structure & Store Integration

- [x] 1.1 Add achievements data structure to Store with getAchievements(), saveAchievements(), updateUsageStat() methods
- [x] 1.2 Initialize default achievements object in Store.getData() for new users

## 2. Achievement System Core Module

- [x] 2.1 Create js/achievement-system.js with ACHIEVEMENTS definition (14 achievements)
- [x] 2.2 Implement checkAchievements(category) function for targeted achievement evaluation
- [x] 2.3 Implement unlockAchievement(id) with toast notification trigger
- [x] 2.4 Implement getProgress(achievement) for progress calculation (e.g., 5/7 days)

## 3. Event Integration

- [x] 3.1 Add streakUpdated event dispatch in Store.updateStreak()
- [x] 3.2 Hook achievement checks to entryAdded event (count, time achievements)
- [x] 3.3 Hook achievement checks to streakUpdated event (streak achievements)
- [x] 3.4 Hook achievement checks to stats section toggle (usage: data-explorer)
- [x] 3.5 Hook achievement checks to theme toggle (usage: theme-changer)
- [x] 3.6 Hook achievement checks to language toggle (usage: polyglot)
- [x] 3.7 Hook achievement checks to export completion (usage: exporter)
- [x] 3.8 Track tag usage for tag-master achievement

## 4. UI Components

- [x] 4.1 Add achievement button (🏆) to footer in index.html
- [x] 4.2 Add achievement modal HTML structure to index.html
- [x] 4.3 Implement renderGallery() to display all achievements in modal
- [x] 4.4 Implement showToast(achievement) for unlock notifications
- [x] 4.5 Add achievement-related CSS styles to styles/main.css

## 5. i18n Integration

- [x] 5.1 Add all achievement translations to locales/zh-TW.json
- [x] 5.2 Add all achievement translations to locales/en.json

## 6. App Integration & Testing

- [x] 6.1 Initialize AchievementSystem in App.init()
- [x] 6.2 Add script tag for achievement-system.js in index.html
- [x] 6.3 Test dark theme appearance
- [x] 6.4 Test light theme appearance
- [x] 6.5 Test Chinese language display
- [x] 6.6 Test English language display
