# search Specification

## Purpose
Real-time search functionality that filters entries by text content with instant results. Supports partial matching and case-insensitive search across all entry text.
TBD - created by archiving change add-search-feature. Update Purpose after archive.
## Requirements
### Requirement: Search input displays above timeline
The system SHALL display a search input field above the timeline entries.

#### Scenario: Search box visible on page load
- **WHEN** user opens the application
- **THEN** search input is visible above the timeline
- **AND** search input has a search icon
- **AND** search input has a placeholder text

#### Scenario: Clear button appears when search has text
- **WHEN** user types text into search input
- **THEN** a clear button is displayed inside the search input
- **AND** clicking clear button removes all text and clears the filter

### Requirement: Search filters timeline entries instantly
The system SHALL filter timeline entries as the user types.

#### Scenario: Filter on input
- **WHEN** user types in the search input
- **THEN** timeline is filtered to show only matching entries
- **AND** filtering happens immediately without pressing enter

#### Scenario: Case-insensitive search
- **WHEN** user searches for "Project"
- **THEN** entries containing "project", "PROJECT", or "Project" are all shown

#### Scenario: Partial match support
- **WHEN** user searches for "meet"
- **THEN** entries containing "meeting", "meet", or "meetup" are shown

### Requirement: Search shows empty state when no results
The system SHALL display a message when no entries match the search.

#### Scenario: No results message
- **WHEN** user searches for text that matches no entries
- **THEN** timeline displays "沒有符合搜尋條件的記錄" message
- **AND** no timeline entries are shown

### Requirement: Search works with tag filter
The system SHALL combine search filter with existing tag filter.

#### Scenario: Search and tag filter combined
- **WHEN** user selects a tag AND enters search text
- **THEN** timeline shows entries that match both the tag AND the search text

#### Scenario: Clearing search preserves tag filter
- **WHEN** user clears the search input
- **THEN** tag filter remains active
- **AND** timeline shows entries matching the selected tags

