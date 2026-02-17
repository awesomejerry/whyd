# store Specification

## Purpose
TBD - created by archiving change statistics. Update Purpose after archive.
## Requirements
### Requirement: Get entries by date range
The Store module SHALL provide a method to retrieve entries within a specified date range.

#### Scenario: Retrieve entries in range
- **WHEN** Store.getEntriesByDateRange(from, to) is called with valid Date objects
- **THEN** system SHALL return an array of entries where createdAt is between from and to (inclusive)

#### Scenario: Inclusive date range
- **WHEN** from and to dates are the same day
- **THEN** system SHALL return all entries created on that day

#### Scenario: Empty result for no entries
- **WHEN** no entries exist in the specified range
- **THEN** system SHALL return an empty array

