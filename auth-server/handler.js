const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

/* 
  Scopes allows you to set the access level
*/
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/* 
  Credentials are those values required to get access to your calendar
*/
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://deepthisrao.github.io/meet-react-app"],
  javascript_origins: ["https://deepthisrao.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/* 
  Step:1 Generate a URL so user can log in with google and authorized to view google calendar.
  After successful login, they will receive code as a URL parameter
*/

module.exports.getAuthURL = async () => {
  /* 
    Any scope passed must be enabled in our project google console "OAuth consent screen" settings.
    Also, any passed scopes are the ones user will see when consent screen is dispalyed to them. 
  */
  const authURL = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      authURL: authURL,
    }),
  };
};

/* 
  Code for generating access code 
*/
module.exports.getAccessToken = async (events) => {
  //instantiate OAuthClient
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${events.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if(err){
        return reject(err);
      }
      return resolve(token);
    });
  })
  .then((token) => {
    //respond with oAuth Token
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(token),
    };
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  });
};

//Fetching google calendar events with access code
module.exports.getCalendarEvents = async (events) => {
  //instantiate OAuthClient
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Decode authorization code extracted from the URL query
  const access_token = decodeURIComponent(`${events.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      ( error, response ) => {
        if(error){
          return reject(error);
        }
        return resolve(response);
      }
    );
  })
  .then((results) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
      },
      body: JSON.stringify({ events : results.data.items })
    }
  })
  .catch((err) => {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  });
}