Feature: Practice Test Automation Login

  Scenario: Valid Login
    Given I open the Practice Test login page
    When I login with username "student" and password "Password123"
    Then I should see the success message

  Scenario: Invalid Login
    Given I open the Practice Test login page
    When I login with username "incorrectUser" and password "Password123"
    Then I should see the error message

  Scenario: Invalid Login
    Given I open the Practice Test login page
    When I login with username "student" and password "incorrectPassword"
    Then I should see the error message

  Scenario: Invalid Login
    Given I open the Practice Test login page
    When I login with username "@22348&*@()" and password "&*@@#&"
    Then I should see the error message

