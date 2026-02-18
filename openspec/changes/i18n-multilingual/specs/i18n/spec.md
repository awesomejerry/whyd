# i18n Specification

## Purpose
Provides internationalization (i18n) support for the WHYD application, enabling users to switch between languages and view the interface in their preferred language.

## Requirements

### Requirement: Language Management
The system SHALL provide a centralized i18n module for managing application languages.

#### Scenario: Default language
- **WHEN** application initializes without a saved language preference
- **THEN** system SHALL use zh-TW (Traditional Chinese) as the default language

#### Scenario: Saved language preference
- **WHEN** application initializes with a saved language preference in Store
- **THEN** system SHALL use the saved language

#### Scenario: Available languages
- **WHEN** i18n module is loaded
- **THEN** system SHALL support zh-TW (Traditional Chinese) and en (English)

### Requirement: Translation Function
The system SHALL provide a translation function `i18n.t(key)` for looking up translated strings.

#### Scenario: Simple translation
- **WHEN** i18n.t('app.title') is called
- **THEN** system SHALL return the translated string for the current language

#### Scenario: Namespaced translation
- **WHEN** i18n.t('tags.clearFilter') is called
- **THEN** system SHALL return the translated string from the tags namespace

#### Scenario: Missing translation key
- **WHEN** i18n.t('nonexistent.key') is called
- **THEN** system SHALL return the key itself ('nonexistent.key')

### Requirement: Language Switching
The system SHALL allow users to switch the interface language at runtime.

#### Scenario: Switch language
- **WHEN** user clicks the language toggle button
- **THEN** system SHALL switch to the next available language
- **AND** system SHALL dispatch a 'languageChanged' CustomEvent
- **AND** system SHALL update the HTML lang attribute

#### Scenario: Persist language preference
- **WHEN** user switches language
- **THEN** system SHALL save the new language preference to Store.settings.language

### Requirement: Language Toggle UI
The system SHALL provide a language toggle button in the footer.

#### Scenario: Language button display
- **WHEN** application loads
- **THEN** a language toggle button SHALL be visible in the footer secondary actions area
- **AND** the button SHALL indicate the current language

#### Scenario: Language button tooltip
- **WHEN** user hovers over the language toggle button
- **THEN** a tooltip SHALL display "切換語言 / Switch Language"

### Requirement: HTML Lang Attribute
The system SHALL dynamically update the HTML lang attribute based on the current language.

#### Scenario: Update lang attribute
- **WHEN** language is changed to zh-TW
- **THEN** document.documentElement.lang SHALL be 'zh-TW'

#### Scenario: Update lang attribute for English
- **WHEN** language is changed to en
- **THEN** document.documentElement.lang SHALL be 'en'

### Requirement: Translation Keys Coverage
The system SHALL provide translations for all user-facing text.

#### Scenario: Header translations
- **WHEN** i18n is initialized
- **THEN** translations SHALL be available for:
  - app.title: "WHYD"
  - app.tagline: "What Have You Done"

#### Scenario: Input section translations
- **WHEN** i18n is initialized
- **THEN** translations SHALL be available for:
  - input.placeholder: Input field placeholder text

#### Scenario: Tags section translations
- **WHEN** i18n is initialized
- **THEN** translations SHALL be available for:
  - tags.title: "標籤" / "Tags"
  - tags.clearFilter: "清除篩選" / "Clear Filter"
  - tags.work: "工作" / "Work"
  - tags.life: "生活" / "Life"
  - tags.learn: "學習" / "Learn"
  - tags.health: "健康" / "Health"

#### Scenario: Timeline translations
- **WHEN** i18n is initialized
- **THEN** translations SHALL be available for:
  - timeline.empty: Empty state message

#### Scenario: Streak translations
- **WHEN** i18n is initialized
- **THEN** translations SHALL be available for:
  - streak.days: "天連續" / "days streak"
  - streak.bestRecord: "最佳紀錄" / "Best Record"
  - streak.day: "天" / "day"

#### Scenario: Modal and button translations
- **WHEN** i18n is initialized
- **THEN** translations SHALL be available for all modal titles, button text, and notification messages
