# store Specification (Delta)

## ADDED Requirements

### Requirement: Language preference storage
The Store module SHALL support storing and retrieving user language preference.

#### Scenario: Get default language
- **WHEN** Store.getLanguage() is called and no language preference is saved
- **THEN** system SHALL return 'zh-TW' as the default language

#### Scenario: Save language preference
- **WHEN** Store.setLanguage('en') is called
- **THEN** system SHALL save 'en' to settings.language in the stored data
- **AND** subsequent calls to Store.getLanguage() SHALL return 'en'

#### Scenario: Persist language across sessions
- **WHEN** user sets language preference
- **AND** application is reloaded
- **THEN** Store.getLanguage() SHALL return the previously saved language
