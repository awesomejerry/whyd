## ADDED Requirements

### Requirement: Display today's entries

The system SHALL display all entries from today in chronological order.

#### Scenario: View today's achievements
- **WHEN** user opens the app
- **THEN** system shows all entries from today with time, content, and tags

### Requirement: Auto-update on new entry

The system SHALL update the timeline when a new entry is added.

#### Scenario: New entry appears
- **WHEN** user submits a new entry
- **THEN** timeline updates with pop-in animation

### Requirement: Empty state

The system SHALL show a friendly message when no entries exist.

#### Scenario: No entries today
- **WHEN** user has no entries today
- **THEN** system shows "今天還沒有記錄，開始吧！"
