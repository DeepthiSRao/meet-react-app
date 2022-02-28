# meet-react-app
MeetUp app is a serverless, progressive web application(PWA) built with ReactJS using TDD(Test driven development) approach. The application uses the Google Calendar API to fetch upcoming events. 

<p align="center">
  <img src="/src/images/home_page.png" width="400" height="200"/>
  <img src="/src/images/event_page2.png" width="400" height="200"/>
  <img src="/src/images/loading_page.png" width="400" height="200"/>
  <img src="/src/images/event_page1.png" width="400" height="200"/>
</p>

## App features
1. Google Login was implemented using OAuth2 authentication.
2. Google calendar events can be filtered by city name or by number of events.
3. Users can see or hide event details by clicking on the SHOW/HIDE button.
4. Events Pie/Scatter chart showing number of upcoming events by city.
5. AWS lambda (severless) functions are implemented for authorization. 
6. App displays last saved events when offline.

Project live demo link : [demo](https://deepthisrao.github.io/meet-react-app/)

## User Stories
#### Feature 1: FILTER EVENTS BY CITY
As a ***user***,
I should be ***filter events by city***
So that ***I can see the list of events that take place in that city***

#### Feature 2: SHOW/HIDE AN EVENT'S DETAILS
As a ***user***,
I should be ***able to click on the button***
So that ***I can see the events details or hide an events detail***

#### Feature 3: SPECIFY NUMBER OF EVENTS
As a ***user***,
I should be ***able to specify number of events***
So that ***I can see the more or less events in the events list***

#### Feature 4: USE THE APP WHEN OFFLINE
As a ***user***,
I should be ***able to use the app when offline***
So that ***I can view the last events before going offline***

#### Feature 5: DATA VISUALIZATION
As a ***user***,
I should be ***able to check on upcoming events***
So that ***I can view the chart with number of upcoming events in the city***

Click here to view detailed user stories and scenarios [here](https://github.com/DeepthiSRao/meet-react-app/blob/main/user-stories.md)

## Installation

Clone the repository, change directories, and use NPM to install the dependencies.

```bash
$ git clone https://github.com/DeepthiSRao/meet-react-app.git
$ cd myFllix-client
$ npm install
```

## Usage

In the project directory, you can run:

- `npm start`

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.