Feature: Exceptions Testing

  Scenario: Test Case 1 - NoSuchElementException
    Given I open the Test Exceptions page
    When I click the Add button
    Then Row 2 input field should be displayed

  Scenario: Test Case 2 - ElementNotInteractableException
    Given I open the Test Exceptions page
    When I click the Add button
    And I wait for Row 2 input to appear
    And I type "Hello123" into Row 2 input field
    And I click the visible Save button
    Then I should see the saved confirmation

  Scenario: Test Case 3 - InvalidElementStateException
    Given I open the Test Exceptions page
    When I click the Edit button
    And I clear Row 1 input field
    And I type "mirza" into Row 1 input field
    And I click the Save button
    Then I should see the Row 1 saved message

  Scenario: Test Case 4 - StaleElementReferenceException
    Given I open the Test Exceptions page
    When I capture the instructions text element
    And I click the Add button for stale test
    Then The instructions text element should disappear

  Scenario: Test Case 5 - TimeoutException
    Given I open the Test Exceptions page
    When I click the Add button
    And I wait only 3 seconds for Row 2 input
    Then Row 2 input should NOT be displayed within 3 seconds

