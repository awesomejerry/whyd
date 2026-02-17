## 1. Setup and File Structure

- [x] 1.1 Create js/onboarding.js file with basic module structure
- [x] 1.2 Create styles/onboarding.css file
- [x] 1.3 Add onboarding.css link to index.html head
- [x] 1.4 Uncomment onboarding.js script tag in index.html

## 2. Modal UI Structure

- [x] 2.1 Create onboarding modal container HTML structure in onboarding.js
- [x] 2.2 Add overlay backdrop styles in onboarding.css
- [x] 2.3 Add modal content container styles in onboarding.css
- [x] 2.4 Add step indicator component HTML and CSS
- [x] 2.5 Add navigation buttons (下一步, 跳過, 開始使用) HTML and CSS

## 3. Step Content Implementation

- [x] 3.1 Implement renderStep0() for welcome screen with concept explanation
- [x] 3.2 Implement renderStep1() for feature introduction (input, timeline, tags, stats)
- [x] 3.3 Implement renderStep2() for guided first entry with sample text and tag selection
- [x] 3.4 Add content styling for each step (title, description, illustrations/icons)

## 4. Navigation Logic

- [x] 4.1 Implement step state management (currentStep variable)
- [x] 4.2 Implement nextStep() function to increment step and re-render
- [x] 4.3 Implement prevStep() function to decrement step and re-render
- [x] 4.4 Implement skipOnboarding() function to close modal and set onboarded status
- [x] 4.5 Implement completeOnboarding() function to save first entry and set onboarded status
- [x] 4.6 Update step indicator when step changes

## 5. Integration with Store

- [x] 5.1 Verify Store.setOnboarded() is called when onboarding completes
- [x] 5.2 Verify Store.addEntry() is called with user input on step 3
- [x] 5.3 Ensure entry appears in timeline after onboarding completion
- [x] 5.4 Verify Store.isOnboarded() prevents re-displaying onboarding

## 6. Integration with App

- [x] 6.1 Verify App.init() calls Onboarding.start() when not onboarded
- [x] 6.2 Ensure onboarding modal overlays main app content
- [x] 6.3 Verify main app remains functional after onboarding dismissal

## 7. Styling and Polish

- [x] 7.1 Apply consistent styling using existing CSS variables (--primary, --surface, --text, etc.)
- [x] 7.2 Add entrance/exit animations (fade-in, slide-up)
- [x] 7.3 Ensure responsive design for mobile devices (max-width: 480px)
- [x] 7.4 Add hover and active states for buttons
- [x] 7.5 Ensure sufficient touch target sizes (min 44px)

## 8. Testing and Validation

- [x] 8.1 Test first-time user flow (all 3 steps)
- [x] 8.2 Test skip functionality on each step
- [x] 8.3 Test back navigation between steps
- [x] 8.4 Test that returning users don't see onboarding
- [x] 8.5 Test guided entry saves correctly with selected tags
- [x] 8.6 Test that sample text can be modified before saving
- [x] 8.7 Verify no console errors during onboarding flow
