# streak-tracker Specification

## Purpose
Gamification element that tracks consecutive days of usage. Displays current streak and best streak, encouraging daily engagement through visual progress indicators.
TBD - created by archiving change streak-tracker. Update Purpose after archive.
## Requirements
### Requirement: Streak calculation
The system SHALL calculate consecutive daily activity based on calendar days (not 24-hour periods).

#### Scenario: First activity creates streak
- **WHEN** user triggers activity for the first time
- **THEN** current streak SHALL be 1 and best streak SHALL be 1

#### Scenario: Consecutive day increments streak
- **WHEN** user triggers activity on the day after last activity
- **THEN** current streak SHALL increment by 1

#### Scenario: Skipped day resets streak
- **WHEN** user has no activity for more than 1 calendar day
- **THEN** current streak SHALL reset to 1

#### Scenario: Same day activity does not affect streak
- **WHEN** user triggers multiple activities on the same day
- **THEN** current streak SHALL remain unchanged

### Requirement: Best streak tracking
The system SHALL track and persist the highest streak ever achieved.

#### Scenario: New best streak recorded
- **WHEN** current streak exceeds previous best streak
- **THEN** best streak SHALL be updated to current streak value

#### Scenario: Best streak persists after reset
- **WHEN** current streak resets due to missed day
- **THEN** best streak SHALL retain its previous value

### Requirement: Flame indicator display
The system SHALL display flame icons based on current streak tier.

#### Scenario: Newcomer tier (1-3 days)
- **WHEN** current streak is 1, 2, or 3 days
- **THEN** system SHALL display 💫 icon

#### Scenario: Warming up tier (3-6 days)
- **WHEN** current streak is 3, 4, 5, or 6 days
- **THEN** system SHALL display 🔥 icon

#### Scenario: On fire tier (7-29 days)
- **WHEN** current streak is 7 through 29 days
- **THEN** system SHALL display 🔥🔥 (two flames)

#### Scenario: Inferno tier (30+ days)
- **WHEN** current streak is 30 days or more
- **THEN** system SHALL display 🔥🔥🔥 (three flames)

### Requirement: Flame animation
The system SHALL animate flame icons with subtle movement effects.

#### Scenario: Flame animation on display
- **WHEN** flame indicator is rendered
- **THEN** icon SHALL have CSS animation with flicker/floating effect

#### Scenario: Animation respects reduced motion preference
- **WHEN** user has prefers-reduced-motion enabled
- **THEN** animation SHALL be disabled or significantly reduced

