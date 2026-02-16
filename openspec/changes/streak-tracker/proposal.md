## Why

Users need motivation to maintain consistent daily engagement. A streak tracker provides visual feedback and gamification that encourages users to return daily, building healthy habits through positive reinforcement. The flame progression system creates emotional attachment to maintaining streaks.

## What Changes

- Add streak tracking system that counts consecutive days of activity
- Display current streak and best (longest) streak records
- Implement visual flame indicator system:
  - 1-3 days: 💫 (sparkle)
  - 3-6 days: 🔥 (one flame)
  - 7-29 days: 🔥🔥 (two flames)
  - 30+ days: 🔥🔥🔥 (three flames)
- Add animated flame effects for visual appeal
- Persist streak data across sessions

## Capabilities

### New Capabilities
- `streak-tracker`: Tracks consecutive daily activity, calculates current/best streaks, renders flame indicators with animations

### Modified Capabilities
- None

## Impact

- New file: `js/streak-tracker.js`
- Requires localStorage or similar persistence mechanism
- Integrates with existing activity tracking system
