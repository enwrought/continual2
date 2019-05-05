import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

type CalendarEntry = {
  date: Date;
  title: string;
  description?: string;
  tags?: string[];
};

interface CalendarImporter {
  import: () => CalendarEntry[];
}

// Possible scopes:
// https://www.googleapis.com/auth/calendar	Manage your calendars
// https://www.googleapis.com/auth/calendar.events	View and edit events on all your calendars
// https://www.googleapis.com/auth/calendar.events.readonly	View events on all your calendars
// https://www.googleapis.com/auth/calendar.readonly	View your calendars
// https://www.googleapis.com/auth/calendar.settings.readonly	View your Calendar settings
// See https://developers.google.com/identity/protocols/googlescopes#calendarv3 for more info
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Calendar API.
//   authorize(JSON.parse(content), listEvents);
// });

/**
 * From google
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
// function getAccessToken(oAuth2Client: string, callback: any) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth: OAuth2Client|string) {
  const calendar = google.calendar(
    {
      auth,
      version: 'v3'
    }
  );
  calendar.events.list(
    {
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    },
    (err, res) => {
      if (err || !res) {
        console.warn('The API returned an error: ' + err);
        return;
      }
      const events = res.data.items || [];
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          if (event.start) {
            // TODO: handle time zone
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          } else {
            // TODO: handle no start date on calendar event
            console.warn('No start date for event!');
          }
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
}

export class GoogleCalendarImporter implements CalendarImporter {
  calendar: calendar_v3;

  constructor() {
    this.calendar = google.calendar({
      version: 'v3',
      auth: process.env.googleAuth
    });
  }

  import() {
    // this.calendar();
    return [
      {
        date: Date.now(),
        title: '',
        description: '',
        tags: []
      }
    ];
  }
}

/* tslint:disable:max-line-length */
// TODO: THIS STORY - make calls
// 1) Get the list
// GET https://www.googleapis.com/calendar/v3/users/me/calendarList
// Example output:
// {
//   "items": [
//     {
//       "kind": "calendar#calendarListEntry", 
//       "foregroundColor": "#000000", 
//       "defaultReminders": [], 
//       "colorId": "6", 
//       "selected": true, 
//       "conferenceProperties": {
//         "allowedConferenceSolutionTypes": [
//           "eventHangout"
//         ]
//       }, 
//       "summary": "Cute plans", 
//       "etag": "\"1538618518650000\"", 
//       "backgroundColor": "#ffad46", 
//       "timeZone": "America/Los_Angeles", 
//       "accessRole": "owner", 
//       "id": "8d72jsd9ld66vq05qio5pn9nn0@group.calendar.google.com"
//     }, 
//     {
//       "kind": "calendar#calendarListEntry", 
//       "foregroundColor": "#000000", 
//       "defaultReminders": [
//         {
//           "minutes": 10, 
//           "method": "popup"
//         }
//       ], 
//       "primary": true, 
//       "colorId": "14", 
//       "selected": true, 
//       "notificationSettings": {
//         "notifications": [
//           {
//             "type": "eventCreation", 
//             "method": "email"
//           }, 
//           {
//             "type": "eventCancellation", 
//             "method": "email"
//           }, 
//           {
//             "type": "eventResponse", 
//             "method": "email"
//           }
//         ]
//       }, 
//       "summary": "Mr. B. Lin", 
//       "conferenceProperties": {
//         "allowedConferenceSolutionTypes": [
//           "eventHangout"
//         ]
//       }, 
//       "etag": "\"1470525351031000\"", 
//       "backgroundColor": "#9fe1e7", 
//       "timeZone": "America/Los_Angeles", 
//       "accessRole": "owner", 
//       "id": "mr.b.lin.7@gmail.com"
//     }, 
//     {
//       "kind": "calendar#calendarListEntry", 
//       "foregroundColor": "#000000", 
//       "defaultReminders": [], 
//       "colorId": "17", 
//       "selected": true, 
//       "conferenceProperties": {
//         "allowedConferenceSolutionTypes": [
//           "eventHangout"
//         ]
//       }, 
//       "summary": "Contacts", 
//       "etag": "\"1535179319166000\"", 
//       "backgroundColor": "#9a9cff", 
//       "summaryOverride": "Contacts", 
//       "timeZone": "America/Los_Angeles", 
//       "accessRole": "reader", 
//       "id": "#contacts@group.v.calendar.google.com"
//     }, 
//     {
//       "kind": "calendar#calendarListEntry", 
//       "foregroundColor": "#000000", 
//       "defaultReminders": [], 
//       "colorId": "7", 
//       "selected": true, 
//       "conferenceProperties": {
//         "allowedConferenceSolutionTypes": [
//           "eventHangout"
//         ]
//       }, 
//       "summary": "Holidays in United States", 
//       "etag": "\"1489696731501000\"", 
//       "backgroundColor": "#42d692", 
//       "timeZone": "America/Los_Angeles", 
//       "accessRole": "reader", 
//       "id": "en.usa#holiday@group.v.calendar.google.com"
//     }
//   ], 
//   "kind": "calendar#calendarList", 
//   "etag": "\"p33ga9360kbsdq0g\"", 
//   "nextSyncToken": "COCkjMCi-N0CEhRtci5iLmxpbi43QGdtYWlsLmNvbQ=="
// }

// 2. Get the calendar events from the calendar
// GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events
// Example output:
// {
//   "kind": "calendar#events", 
//   "defaultReminders": [], 
//   "items": [
//     {
//       "status": "confirmed", 
//       "kind": "calendar#event", 
//       "end": {
//         "dateTime": "2018-10-07T14:30:00-07:00"
//       }, 
//       "created": "2018-10-02T17:07:05.000Z", 
//       "iCalUID": "3rsuijqlo07frt3nn6t9ok1c4j@google.com", 
//       "reminders": {
//         "useDefault": false
//       }, 
//       "extendedProperties": {
//         "private": {
//           "everyoneDeclinedDismissed": "-1"
//         }
//       }, 
//       "htmlLink": "https://www.google.com/calendar/event?eid=M3JzdWlqcWxvMDdmcnQzbm42dDlvazFjNGogOGQ3MmpzZDlsZDY2dnEwNXFpbzVwbjlubjBAZw", 
//       "sequence": 0, 
//       "updated": "2018-10-02T17:07:05.229Z", 
//       "summary": "SF?? or hike??", 
//       "start": {
//         "dateTime": "2018-10-07T05:30:00-07:00"
//       }, 
//       "etag": "\"3077000050374000\"", 
//       "organizer": {
//         "self": true, 
//         "displayName": "Cute plans", 
//         "email": "8d72jsd9ld66vq05qio5pn9nn0@group.calendar.google.com"
//       }, 
//       "creator": {
//         "displayName": "Bryant Lin", 
//         "email": "mr.b.lin.7@gmail.com"
//       }, 
//       "id": "3rsuijqlo07frt3nn6t9ok1c4j"
//     }, 
//     {
//       "status": "confirmed", 
//       "kind": "calendar#event", 
//       "end": {
//         "dateTime": "2018-10-14T14:00:00-07:00"
//       }, 
//       "created": "2018-10-09T02:04:11.000Z", 
//       "iCalUID": "5a69801opkgpn6v2cjfa0bt049@google.com", 
//       "reminders": {
//         "useDefault": false
//       }, 
//       "extendedProperties": {
//         "private": {
//           "everyoneDeclinedDismissed": "-1"
//         }
//       }, 
//       "htmlLink": "https://www.google.com/calendar/event?eid=NWE2OTgwMW9wa2dwbjZ2MmNqZmEwYnQwNDkgOGQ3MmpzZDlsZDY2dnEwNXFpbzVwbjlubjBAZw", 
//       "sequence": 0, 
//       "updated": "2018-10-09T02:04:11.685Z", 
//       "summary": "Katsu's 1st birthday", 
//       "start": {
//         "dateTime": "2018-10-14T12:00:00-07:00"
//       }, 
//       "etag": "\"3078101303145000\"", 
//       "organizer": {
//         "self": true, 
//         "displayName": "Cute plans", 
//         "email": "8d72jsd9ld66vq05qio5pn9nn0@group.calendar.google.com"
//       }, 
//       "creator": {
//         "displayName": "Bryant Lin", 
//         "email": "mr.b.lin.7@gmail.com"
//       }, 
//       "id": "5a69801opkgpn6v2cjfa0bt049"
//     }, 
//     {
//       "status": "confirmed", 
//       "kind": "calendar#event", 
//       "end": {
//         "dateTime": "2018-10-14T13:00:00-07:00"
//       }, 
//       "created": "2018-10-09T02:03:43.000Z", 
//       "iCalUID": "05guu4qr8djdifo0bi2brnpaoc@google.com", 
//       "reminders": {
//         "useDefault": false
//       }, 
//       "htmlLink": "https://www.google.com/calendar/event?eid=MDVndXU0cXI4ZGpkaWZvMGJpMmJybnBhb2MgOGQ3MmpzZDlsZDY2dnEwNXFpbzVwbjlubjBAZw", 
//       "sequence": 0, 
//       "updated": "2018-10-09T02:04:22.309Z", 
//       "summary": "Brunch?", 
//       "start": {
//         "dateTime": "2018-10-14T11:00:00-07:00"
//       }, 
//       "etag": "\"3078101324370000\"", 
//       "organizer": {
//         "self": true, 
//         "displayName": "Cute plans", 
//         "email": "8d72jsd9ld66vq05qio5pn9nn0@group.calendar.google.com"
//       }, 
//       "creator": {
//         "displayName": "Bryant Lin", 
//         "email": "mr.b.lin.7@gmail.com"
//       }, 
//       "id": "05guu4qr8djdifo0bi2brnpaoc"
//     }
//   ], 
//   "updated": "2018-10-09T02:04:23.042Z", 
//   "summary": "Cute plans", 
//   "etag": "\"p338bffu0kbsdq0g\"", 
//   "nextSyncToken": "CNC3v8Ci-N0CENC3v8Ci-N0CGAU=", 
//   "timeZone": "America/Los_Angeles", 
//   "accessRole": "owner"
// }
