Feature: Show/hide an event details

Scenario: An event element is collapsed by default
Given app loaded
And the list of events has been loaded
When the user has not clicked on {Show Details} yet
Then the event detail elements are collapsed

Scenario: User can expand an event to see its details
Given app loaded
And the list of events has been loaded
When the user clicks on {Show Details} button
Then event element expands and shows more details about event

Scenario: User can collapse an event to hide its details
Given app loaded
And event element is expanded
When the user clicks on {Hide Details} button
Then the event detail elements are collapsed