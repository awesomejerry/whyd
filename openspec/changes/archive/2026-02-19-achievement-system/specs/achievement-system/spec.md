## ADDED Requirements

### Requirement: Achievement definitions
The system SHALL define 14 achievements across 4 categories: streak (4), count (4), usage (5), time (2).

#### Scenario: Achievement categories are complete
- **WHEN** the achievement system initializes
- **THEN** the following achievements SHALL be defined:
  - Streak: fire-starter (7 days), week-warrior (14 days), month-master (30 days), streak-legend (100 days)
  - Count: first-step (1 entry), tenacity (10 entries), century (100 entries), overachiever (500 entries)
  - Usage: tag-master (all 4 default tags), data-explorer (10 stats views), exporter (first export), theme-changer (theme switch), polyglot (language switch)
  - Time: early-bird (before 6 AM), night-owl (after midnight)

### Requirement: Achievement data persistence
The system SHALL persist achievement unlock status and timestamps in localStorage within the existing Store data structure.

#### Scenario: New user has no unlocked achievements
- **WHEN** a new user accesses the app
- **THEN** the achievements object SHALL be initialized with empty unlockedIds and unlockedAt
- **AND** usageStats SHALL be initialized with default values (statsViewed: 0, themeChanged: false, etc.)

#### Scenario: Unlocked achievement persists across sessions
- **WHEN** a user unlocks an achievement
- **THEN** the achievement id SHALL be added to unlockedIds
- **AND** the unlock timestamp SHALL be recorded in unlockedAt
- **AND** the data SHALL persist in localStorage

### Requirement: Streak achievement detection
The system SHALL detect and unlock streak achievements when the user's current streak reaches the required threshold.

#### Scenario: Fire Starter unlocked at 7-day streak
- **WHEN** user's current streak reaches 7 days
- **THEN** fire-starter achievement SHALL be unlocked
- **AND** toast notification SHALL be displayed

#### Scenario: Month Master unlocked at 30-day streak
- **WHEN** user's current streak reaches 30 days
- **THEN** month-master achievement SHALL be unlocked

### Requirement: Count achievement detection
The system SHALL detect and unlock count achievements when total entry count reaches thresholds.

#### Scenario: First Step unlocked on first entry
- **WHEN** user adds their first entry
- **THEN** first-step achievement SHALL be unlocked

#### Scenario: Century unlocked at 100 entries
- **WHEN** user's total entry count reaches 100
- **THEN** century achievement SHALL be unlocked

### Requirement: Time achievement detection
The system SHALL detect and unlock time achievements based on entry creation time.

#### Scenario: Early Bird unlocked before 6 AM
- **WHEN** user adds an entry between 00:00 and 06:00 local time
- **THEN** early-bird achievement SHALL be unlocked

#### Scenario: Night Owl unlocked after midnight
- **WHEN** user adds an entry between 00:00 and 05:00 local time
- **THEN** night-owl achievement SHALL be unlocked

### Requirement: Usage achievement detection
The system SHALL detect and unlock usage achievements based on feature interactions.

#### Scenario: Tag Master unlocked with all default tags
- **WHEN** user has used all 4 default tags (work, life, learn, health) at least once
- **THEN** tag-master achievement SHALL be unlocked

#### Scenario: Data Explorer unlocked after 10 stats views
- **WHEN** user views the statistics section 10 times
- **THEN** data-explorer achievement SHALL be unlocked

#### Scenario: Exporter unlocked on first export
- **WHEN** user exports data for the first time
- **THEN** exporter achievement SHALL be unlocked

#### Scenario: Theme Changer unlocked on theme switch
- **WHEN** user switches theme at least once
- **THEN** theme-changer achievement SHALL be unlocked

#### Scenario: Polyglot unlocked on language switch
- **WHEN** user switches language at least once
- **THEN** polyglot achievement SHALL be unlocked

### Requirement: Achievement notification
The system SHALL display a toast notification when an achievement is unlocked.

#### Scenario: Toast appears on achievement unlock
- **WHEN** an achievement is unlocked
- **THEN** a toast notification SHALL appear at the top center of the screen
- **AND** the toast SHALL display the achievement icon and name
- **AND** the toast SHALL auto-dismiss after 3 seconds

### Requirement: Achievement gallery
The system SHALL provide an achievement gallery modal showing all achievements with progress.

#### Scenario: Gallery shows all achievements
- **WHEN** user clicks the achievement button (🏆) in footer
- **THEN** a modal SHALL open displaying all 14 achievements

#### Scenario: Unlocked achievements show completion
- **WHEN** viewing the achievement gallery
- **THEN** unlocked achievements SHALL display with full opacity and checkmark
- **AND** the unlock date SHALL be shown

#### Scenario: Locked achievements show progress
- **WHEN** viewing the achievement gallery
- **THEN** locked achievements SHALL display with reduced opacity
- **AND** progress indicator SHALL show current/required value (e.g., "5/7 days")

### Requirement: Achievement i18n support
The system SHALL support zh-TW and en translations for all achievement names, descriptions, and UI text.

#### Scenario: Achievement names in Chinese
- **WHEN** app language is zh-TW
- **THEN** achievement names SHALL display in Chinese (e.g., "火焰起飛")
- **AND** achievement descriptions SHALL display in Chinese

#### Scenario: Achievement names in English
- **WHEN** app language is en
- **THEN** achievement names SHALL display in English (e.g., "Fire Starter")
- **AND** achievement descriptions SHALL display in English

### Requirement: Achievement theme support
The system SHALL render achievements correctly in both light and dark themes using CSS variables.

#### Scenario: Achievement cards in dark theme
- **WHEN** app is in dark theme (default)
- **THEN** achievement cards SHALL use --surface background and --text color
- **AND** text SHALL be readable with proper contrast

#### Scenario: Achievement cards in light theme
- **WHEN** app is in light theme
- **THEN** achievement cards SHALL adapt to light theme colors
- **AND** text SHALL be readable with proper contrast
