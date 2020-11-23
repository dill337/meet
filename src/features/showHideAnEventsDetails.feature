
Feature: Show more information on an event when clicked

  Scenario: When the user opens up the page the details are not showing
    Given user opens the app
    When the user hasn't clicked on anything
    Then the event details are collapsed

  Scenario: User should be able to click an event button to see details
    Given details button is collapsed
    When the user clicks on an event details button
    Then the user should see more information on that event

  Scenario: User should be able to click an event button to see minimize details
    Given the details are visible
    And the event details are already showing
    When the user clicks on an event details button
    Then the event detail should collapse