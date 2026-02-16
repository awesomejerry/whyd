## Context

Building a client-side streak tracking system for gamification. The streak tracker monitors daily activity and displays visual feedback using flame icons. Data persists in localStorage for cross-session continuity.

## Goals / Non-Goals

**Goals:**
- Track consecutive days of user activity accurately
- Display current streak and best streak with visual indicators
- Implement tiered flame system (💫 → 🔥 → 🔥🔥 → 🔥🔥🔥)
- Add smooth CSS animations for flame effects
- Persist streak data reliably in localStorage

**Non-Goals:**
- Server-side streak synchronization
- Multi-device streak sync
- Social/leaderboard features
- Push notifications for streak reminders

## Decisions

1. **localStorage for persistence** - Simple, reliable, no server dependency. Alternative (IndexedDB) is overkill for small data.

2. **Date-based streak calculation** - Store last activity date, calculate streak on load. Handles timezone edge cases by normalizing to midnight.

3. **CSS keyframe animations** - Native browser animations perform better than JS-based animations. Use `transform` and `opacity` for GPU acceleration.

4. **Flame tiers by thresholds**:
   - 1-3 days: 💫 (newcomer)
   - 3-6 days: 🔥 (warming up)
   - 7-29 days: 🔥🔥 (on fire)
   - 30+ days: 🔥🔥🔥 (inferno)

## Risks / Trade-offs

- **[localStorage cleared]** → Streak resets; acceptable as users control their data
- **[Timezone changes]** → May cause off-by-one streak calculation; mitigate by storing UTC timestamps
- **[No server backup]** → Data loss on browser clear; acceptable for MVP scope
