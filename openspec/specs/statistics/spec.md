# statistics Specification

## Purpose
Data visualization module using Canvas API to render charts (line, pie, bar) showing achievement trends over week/month periods, tag distribution, and activity patterns.
TBD - created by archiving change statistics. Update Purpose after archive.
## Requirements
### Requirement: Statistics module initialization
The Statistics module SHALL initialize when App.init() is called and the Statistics object exists.

#### Scenario: Initialize statistics module
- **WHEN** App.init() is called
- **THEN** Statistics.init() SHALL be called if Statistics module exists

### Requirement: Week/Month toggle
The system SHALL allow users to toggle between week and month statistics view.

#### Scenario: Default to week view
- **WHEN** statistics section is first shown
- **THEN** system SHALL display week view by default

#### Scenario: Toggle to month view
- **WHEN** user clicks month toggle button
- **THEN** system SHALL update all charts to show month data

### Requirement: Achievement count line chart
The system SHALL display a line chart showing daily achievement counts for the selected period.

#### Scenario: Display week line chart
- **WHEN** week view is active
- **THEN** system SHALL display a line chart with 7 data points (one per day)

#### Scenario: Display month line chart
- **WHEN** month view is active
- **THEN** system SHALL display a line chart with up to 30 data points

#### Scenario: Empty data state
- **WHEN** no entries exist for the selected period
- **THEN** system SHALL display an empty state message

### Requirement: Tag distribution pie chart
The system SHALL display a pie chart showing the distribution of tags used.

#### Scenario: Display tag distribution
- **WHEN** statistics section is visible with entries
- **THEN** system SHALL display a pie chart with segments proportional to tag usage

#### Scenario: Legend display
- **WHEN** pie chart is rendered
- **THEN** system SHALL display a legend with tag names and colors

### Requirement: Active hours bar chart
The system SHALL display a bar chart showing the most active hours of the day.

#### Scenario: Display hourly distribution
- **WHEN** statistics section is visible with entries
- **THEN** system SHALL display a bar chart with 24 bars representing hours 0-23

#### Scenario: Highlight peak hours
- **WHEN** bar chart is rendered
- **THEN** system SHALL visually highlight the top 3 most active hours

### Requirement: Responsive charts
All charts SHALL be responsive and adapt to container width changes.

#### Scenario: Resize handling
- **WHEN** container width changes
- **THEN** system SHALL redraw all charts to fit the new width

### Requirement: Canvas rendering
All charts SHALL be rendered using Canvas API without external libraries.

#### Scenario: High DPI support
- **WHEN** chart is rendered on high DPI display
- **THEN** system SHALL scale canvas appropriately for crisp rendering

