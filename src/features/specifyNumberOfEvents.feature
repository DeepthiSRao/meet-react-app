Feature: Specify number of events

Scenario: When user hasn't specified a number, 32 is the default number
Given the user did not specify a number of events being shown
When app loaded
Then the default number of events shown is 32

Scenario: User can change the number of events they want to see
Given the list of events has been loaded
When the user specified a number
Then the number of events listed should be the specified number