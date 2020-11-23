Feature: Specify how many events are displayed

  Scenario: When the user opens the app the default number of events displayed is 32
    Given user opens the app
    When the user hasn't changed anything
    Then the number of events is thirty two

  Scenario: When the user changes the number of events there will be that many displayed
    Given there are thirty two events displayed
    When the user changes the number
    Then there will be the new number of events displayed