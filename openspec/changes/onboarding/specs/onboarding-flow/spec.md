## ADDED Requirements

### Requirement: Onboarding Modal Display
The system SHALL display an onboarding modal when a user first visits the application and has not completed onboarding.

#### Scenario: First-time user sees onboarding
- **WHEN** user visits the application for the first time
- **AND** Store.isOnboarded() returns false
- **THEN** the onboarding modal SHALL be displayed with overlay background
- **AND** the main application interface SHALL be visible but dimmed behind the overlay

#### Scenario: Returning user skips onboarding
- **WHEN** user visits the application
- **AND** Store.isOnboarded() returns true
- **THEN** the onboarding modal SHALL NOT be displayed
- **AND** the application SHALL initialize normally

### Requirement: Step Indicator
The system SHALL display a step indicator showing current progress through the onboarding flow.

#### Scenario: Step indicator updates
- **WHEN** user is on step 1 (index 0)
- **THEN** the step indicator SHALL display "1/3"
- **WHEN** user is on step 2 (index 1)
- **THEN** the step indicator SHALL display "2/3"
- **WHEN** user is on step 3 (index 2)
- **THEN** the step indicator SHALL display "3/3"

### Requirement: Welcome Screen (Step 1)
The system SHALL display a welcome screen explaining the "Reverse Todo List" concept.

#### Scenario: Welcome screen content
- **WHEN** onboarding modal is displayed for step 1
- **THEN** the screen SHALL display a welcome title
- **AND** the screen SHALL explain the "逆向待辦清單" (Reverse Todo List) concept
- **AND** the screen SHALL include a "下一步" (Next) button
- **AND** the screen SHALL include a "跳過" (Skip) button

#### Scenario: Skip onboarding from step 1
- **WHEN** user clicks the "跳過" button on step 1
- **THEN** the onboarding modal SHALL be closed
- **AND** Store.setOnboarded() SHALL be called
- **AND** the main application SHALL be accessible

### Requirement: Feature Introduction (Step 2)
The system SHALL display a feature introduction screen explaining the main application features.

#### Scenario: Feature introduction content
- **WHEN** onboarding modal is displayed for step 2
- **THEN** the screen SHALL introduce the input field for recording achievements
- **AND** the screen SHALL introduce the timeline view for viewing history
- **AND** the screen SHALL introduce the tag system for categorization
- **AND** the screen SHALL introduce the statistics feature
- **AND** the screen SHALL include a "下一步" (Next) button
- **AND** the screen SHALL include a "跳過" (Skip) button

#### Scenario: Navigate to previous step
- **WHEN** user is on step 2
- **AND** user clicks the back button or gesture
- **THEN** the onboarding modal SHALL display step 1 content

### Requirement: Guided First Entry (Step 3)
The system SHALL guide the user through creating their first entry with a sample achievement.

#### Scenario: Guided entry screen content
- **WHEN** onboarding modal is displayed for step 3
- **THEN** the screen SHALL provide a sample achievement text
- **AND** the screen SHALL allow user to edit the sample text
- **AND** the screen SHALL display tag selection options
- **AND** the screen SHALL include a "開始使用" (Start Using) button
- **AND** the screen SHALL NOT display a "跳過" (Skip) button

#### Scenario: User completes first entry
- **WHEN** user clicks the "開始使用" button on step 3
- **THEN** Store.addEntry() SHALL be called with the user's text and selected tags
- **AND** Store.setOnboarded() SHALL be called
- **AND** the onboarding modal SHALL be closed
- **AND** the new entry SHALL appear in the timeline view
- **AND** the input field SHALL be cleared

#### Scenario: User modifies sample text
- **WHEN** user edits the sample achievement text in step 3
- **AND** user clicks "開始使用"
- **THEN** the modified text SHALL be saved as the entry text

#### Scenario: User selects tags
- **WHEN** user selects one or more tags in step 3
- **AND** user clicks "開始使用"
- **THEN** the selected tags SHALL be saved with the entry

### Requirement: Modal Visual Design
The onboarding modal SHALL follow the application's existing design system.

#### Scenario: Modal styling consistency
- **WHEN** onboarding modal is displayed
- **THEN** the modal SHALL use CSS variables defined in main.css (--primary, --surface, --text, etc.)
- **AND** the modal SHALL use the same border-radius as the application (--radius)
- **AND** the modal SHALL use the same shadow styles as the application (--shadow, --shadow-lg)
- **AND** the modal SHALL use existing animation classes (fade-in, slide-up, pop-in)

#### Scenario: Responsive design
- **WHEN** onboarding modal is displayed on mobile devices (max-width: 480px)
- **THEN** the modal content SHALL be readable and scrollable
- **AND** buttons SHALL be large enough for touch interaction (min 44px height)

### Requirement: Navigation Between Steps
The system SHALL provide intuitive navigation between onboarding steps.

#### Scenario: Navigate forward
- **WHEN** user clicks "下一步" button
- **THEN** the current step index SHALL increment by 1
- **AND** the modal SHALL display the next step content
- **AND** the step indicator SHALL update accordingly

#### Scenario: Navigate backward
- **WHEN** user is on step 2 or 3
- **AND** user clicks a back button
- **THEN** the current step index SHALL decrement by 1
- **AND** the modal SHALL display the previous step content
- **AND** the step indicator SHALL update accordingly

#### Scenario: Cannot navigate backward from step 1
- **WHEN** user is on step 1
- **THEN** no back button SHALL be displayed

### Requirement: Data Persistence
The system SHALL persist onboarding completion status using the Store module.

#### Scenario: Save onboarding completion
- **WHEN** user completes onboarding (clicks "開始使用" or "跳過")
- **THEN** Store.setOnboarded() SHALL be called
- **AND** Store.getData().settings.onboarded SHALL be true

#### Scenario: Read onboarding status
- **WHEN** application initializes
- **THEN** the system SHALL call Store.isOnboarded() to check status
- **AND** if the result is true, onboarding SHALL be skipped
