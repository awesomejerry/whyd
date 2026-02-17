## ADDED Requirements

### Requirement: Timeline responds to search filter events
The timeline view SHALL filter entries when search-filtered event is fired.

#### Scenario: Timeline filters on search event
- **WHEN** search-filtered event is fired with search query
- **THEN** timeline re-renders showing only matching entries
- **AND** search query is applied alongside existing tag filters

#### Scenario: Timeline shows search empty state
- **WHEN** search-filtered event results in no matches
- **THEN** timeline shows "沒有符合搜尋條件的記錄" message

#### Scenario: Timeline clears when search is empty
- **WHEN** search-filtered event is fired with empty query
- **THEN** timeline shows all entries (respecting tag filter if active)
