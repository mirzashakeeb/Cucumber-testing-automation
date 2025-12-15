Feature: Table Data Validation

  Scenario: Test Case 1 - Language Filter -> Java
    Given I open the Practice Test Table page
    When I select language filter "Java"
    Then I count how many cells in column 3 contain "Java"

  Scenario: Test Case 2 - Uncheck level filters
    Given I open the Practice Test Table page
    When I uncheck level "Intermediate"
    And I uncheck level "Advanced"
    Then the level should contain "Beginner"

  Scenario: Test Case 3 - Filter and sort table
    Given I open the Practice Test Table page
    When I open the filter dropdown
    And I select the option "10,000+"
    Then I print the enrollment column name and all row values

