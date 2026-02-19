## Context

WHYD is a vanilla JavaScript reverse todo-list app with localStorage persistence. It uses a module-based architecture with CSS variables for theming and a custom i18n system. The achievement system needs to integrate without breaking existing functionality and must support both dark/light themes and zh-TW/en languages.

**Existing Infrastructure:**
- `Store` module for data persistence
- `i18n` module for translations with `i18n.t(key, params)` API
- Event system using `window.dispatchEvent`/`CustomEvent`
- CSS variables: `--primary`, `--surface`, `--text`, `--text-muted`, `--border`, `--shadow-lg`
- Modal pattern: `.modal.hidden` with `.modal-content` animation

## Goals / Non-Goals

**Goals:**
- Implement 14 achievements across 4 categories (streak, count, usage, time)
- Provide visual feedback (toast + gallery) when achievements unlock
- Track progress for incomplete achievements
- Full i18n support for zh-TW and en
- Theme-compatible styling using CSS variables
- Persist unlocked achievements in localStorage

**Non-Goals:**
- Sound effects (optional, can be added later)
- Confetti animation (optional, can be added later)
- Social sharing features
- Achievement comparison with other users

## Decisions

### 1. Data Storage Strategy
**Decision:** Add `achievements` object to existing Store data structure.

```javascript
achievements: {
  unlockedIds: ['fire-starter', 'first-step'],
  unlockedAt: {
    'fire-starter': '2026-02-15T10:30:00.000Z',
    'first-step': '2026-02-10T08:00:00.000Z'
  },
  usageStats: {
    statsViewed: 5,
    themeChanged: false,
    languageChanged: true,
    exported: false,
    tagsUsed: ['work', 'life']
  }
}
```

**Rationale:** Keeps all data in one place, backward compatible (missing keys = default values), no new storage keys needed.

**Alternative considered:** Separate localStorage key - rejected to avoid data fragmentation.

### 2. Achievement Check Trigger Strategy
**Decision:** Event-driven checks with targeted evaluation.

| Trigger Event | Achievement Categories Checked |
|--------------|-------------------------------|
| `entryAdded` | count, time |
| `streakUpdated` (new event) | streak |
| Stats section opened | usage (stats) |
| Theme toggle | usage (theme) |
| Language toggle | usage (language) |
| Export completed | usage (export) |
| Tag used | usage (tags) |

**Rationale:** Prevents unnecessary computation, only checks relevant categories per action.

**Alternative considered:** Polling/interval checks - rejected for performance reasons.

### 3. UI Architecture
**Decision:** Single modal with tabbed/filtered gallery view.

```
┌─────────────────────────────────────┐
│ 🏆 Achievements          [×]       │
├─────────────────────────────────────┤
│ [All] [Streak] [Count] [Usage] [Time] │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐            │
│ │ 🔥  │ │ 📅  │ │ 🏆  │            │
│ │  ✓  │ │  ✓  │ │     │            │
│ └─────┘ └─────┘ └─────┘            │
│                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐            │
│ │ 👑  │ │ 🌟  │ │ 🎯  │            │
│ │     │ │  ✓  │ │     │            │
│ └─────┘ └─────┘ └─────┘            │
└─────────────────────────────────────┘
```

**Rationale:** Consistent with existing modals (export/import), filter allows focusing on specific categories.

### 4. Toast Notification Design
**Decision:** Top-center toast with auto-dismiss (3s).

```css
.achievement-toast {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  animation: toastSlideIn 0.3s ease, toastFadeOut 0.3s ease 2.7s;
}
```

**Rationale:** Non-intrusive, visible but doesn't block content, consistent with modern notification patterns.

### 5. Achievement Definition Structure
**Decision:** Static definition object with requirement function.

```javascript
const ACHIEVEMENTS = [
  {
    id: 'fire-starter',
    icon: '🔥',
    category: 'streak',
    check: (state) => state.streak.current >= 7
  }
];
```

**Rationale:** Simple, declarative, easy to extend. `check` function receives current app state for flexibility.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Achievement data migration for existing users | Default values in `getAchievements()` handle missing keys |
| Toast overlap with multiple unlocks | Queue unlocks, show sequentially with delay |
| Performance with many entries | Count achievements check total count, not iterate all entries |
| Theme contrast issues | Test all achievement card states in both themes before release |

## Migration Plan

1. Deploy with backward-compatible Store access (null checks for `data.achievements`)
2. On first achievement check, initialize missing `achievements` object
3. No user action required - transparent migration
