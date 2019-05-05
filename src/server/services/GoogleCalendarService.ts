import { AxiosResponse } from 'axios';
import { google, calendar_v3 } from 'googleapis';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/User';
import { CalendarService, CalendarInfo, EventInfo } from './CalendarService';
import { GoogleAuthService } from './GoogleAuthService';
// import { BodyResponseCallback } from 'googleapis-common';
// import { ENGINE_METHOD_NONE } from 'constants';

interface GetCalendarsResult {
  calendars: calendar_v3.Schema$CalendarListEntry[];
  syncToken: string;
}

interface GetCalendar {
  calendarId: string;
  title: string;
  description: string;
}

interface GetEvents {
  calendarEvents: calendar_v3.Schema$Event[];
  syncToken: string;
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

/**
 * On server side, we save all calendar info from the user.
 * We can optionally poll every once in a while for the changes to the Google calendar.
 * However, we should have at least 3 endpoints for the user:
 * 1. Store any info needed to get a calendar token from Google
 * 2. Retrieve Google calendar events saved on the server
 * 3. Update the server with the latest information from Google and return the replacement/diff.
 *
 * TODO: STORY - since we are given "patches" from Google, we should try to eventually use the
 * algorithm to handle it, at least on the server side. On client, we can just replace and maybe
 * cache.
 */
@Injectable()
 export class GoogleCalendarService implements CalendarService<CalendarInfo, EventInfo> {
  // TODO: THIS STORY - figure out if we can re-use the same Google Calendar instance
  // for different users/authorizations? otherwise we need to rethink this

  calendar: calendar_v3.Calendar;
  authService: GoogleAuthService;

  constructor(private readonly googleAuthService: GoogleAuthService) {
    this.calendar = google.calendar({ version: 'v3' });
    this.authService = googleAuthService;
  }

  async addCalendar(user: User, calendarInfo: CalendarInfo): Promise<CalendarInfo> {
    return calendarInfo;
  }

  getGoogleAuthUrl(redirectUri: string = 'http://localhost:3000') {
    return this.authService.getRequestUrl(redirectUri, SCOPES);
  }

  // TODO: Auth client or API Key for the request
  // auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;
  async getCalendar(auth: string, calendarId: string): Promise<GetCalendar> {
    return await this.calendar.calendars.get(
      { auth, calendarId }
    ).then(calendar => ({
      calendarId,
      title: calendar.data.summary || '',
      description: calendar.data.description || '',
    }));
  }

  // TODO: STORY - Update from saved sync token
  async getCalendars(auth: string, savedSyncToken?: string): Promise<GetCalendarsResult> {
    // TODO: use savedSyncToken
    let token: string | undefined;
    let syncToken: string | undefined;
    const calendars: calendar_v3.Schema$CalendarListEntry[] = [];
    do {
      // const tmp: BodyResponseCallback<calendar_v3.Schema$CalendarList>;
      google.calendar('v3').calendarList.list(
        {
          // TODO: options
          auth,
          maxResults: 2500,
        }
      ).then((calendarList) => {
        // items: CalendarListEntry[]
        const { items, nextPageToken, nextSyncToken } = calendarList.data;
        calendars.concat(items || []);
        token = nextPageToken;
        syncToken = nextSyncToken;
      });
    } while (token);

    // Google API docs say that either the nextPageToken or nextSyncToken are defined
    // If we exit this loop, we must have a sync token,

    // TODO: what should be the return signature of this?
    if (syncToken) {
      return {
        syncToken,
        calendars
      };
    }
    throw Error('Failed to get sync token');
  }

  async getEvents(auth: string, calendarId: string, savedSyncToken?: string): Promise<GetEvents> {
    let token: string | undefined;
    let syncToken: string | undefined;

    const calendarEvents: calendar_v3.Schema$Event[] = [];
    do {
      await this.calendar.events.list({
        // TODO: options
        calendarId,
        maxResults: 2500,
        // timezone
        // syncToken: savedSyncToken (?????)
      }).then((eventsWrapper: AxiosResponse<calendar_v3.Schema$Events>) => {
        const { items, nextPageToken, nextSyncToken } = eventsWrapper.data;
        calendarEvents.concat(items || []);
        token = nextPageToken;
        syncToken = nextSyncToken;
      });
    } while (token);

    if (syncToken) {
      return {
        calendarEvents,
        syncToken
      };
    }
    throw new Error('Failed to get sync token.');
  }

  /**
   * This needs to happen every so often to keep the calendar up to date.
   * We need to deal with recalculating possible times to put stuff.
   *
   * We also need to return info to update any info next
   * @param calendarId Id of the calendar
   */
  refreshCalendar(calendarId: string, syncToken: string) {
    // if (!syncToken) {
    //   // Do full sync
    //   // TODO: send the auth instead of syncToken
    //   // return this.fullSync(calendarId, syncToken);
    //   return {};
    // }

    // private static void run() throws IOException {
    //   // Construct the {@link Calendar.Events.List} request, but don't execute it yet.
    //   Calendar.Events.List request = client.events().list("primary");
  
    //   // Load the sync token stored from the last execution, if any.
    //   String syncToken = syncSettingsDataStore.get(SYNC_TOKEN_KEY);
    //   if (syncToken == null) {
    //     System.out.println("Performing full sync.");
  
    //     // Set the filters you want to use during the full sync. Sync tokens aren't compatible with
    //     // most filters, but you may want to limit your full sync to only a certain date range.
    //     // In this example we are only syncing events up to a year old.
    //     Date oneYearAgo = Utils.getRelativeDate(java.util.Calendar.YEAR, -1);
    //     request.setTimeMin(new DateTime(oneYearAgo, TimeZone.getTimeZone("UTC")));
    //   } else {
    //     System.out.println("Performing incremental sync.");
    //     request.setSyncToken(syncToken);
    //   }
  
    //   // Retrieve the events, one page at a time.
    //   String pageToken = null;
    //   Events events = null;
    //   do {
    //     request.setPageToken(pageToken);
  
    //     try {
    //       events = request.execute();
    //     } catch (GoogleJsonResponseException e) {
    //       if (e.getStatusCode() == 410) {
    //         // A 410 status code, "Gone", indicates that the sync token is invalid.
    //         System.out.println("Invalid sync token, clearing event store and re-syncing.");
    //         syncSettingsDataStore.delete(SYNC_TOKEN_KEY);
    //         eventDataStore.clear();
    //         run();
    //       } else {
    //         throw e;
    //       }
    //     }
  
    //     List<Event> items = events.getItems();
    //     if (items.size() == 0) {
    //       System.out.println("No new events to sync.");
    //     } else {
    //       for (Event event : items) {
    //         syncEvent(event);
    //       }
    //     }
  
    //     pageToken = events.getNextPageToken();
    //   } while (pageToken != null);
  
    //   // Store the sync token from the last request to be used during the next execution.
    //   syncSettingsDataStore.set(SYNC_TOKEN_KEY, events.getNextSyncToken());
  
    //   System.out.println("Sync complete.");
    // }
    //

    // TODO: otherwise, do partial sync
    const dummyCalendarInfo: CalendarInfo = {
      name: 'asjdkfl',
      link: 'asdjkfl',
    };
    return Promise.resolve(dummyCalendarInfo);
  }

  addEvent(calendarId: string, eventInfo: EventInfo) {
    // TODO: implement
    return Promise.resolve(false);
  }

  // TODO: THIS STORY - sync color too from Google
  private async fullSync(user: User, auth: string) {
    const { syncToken, calendars } = await this.getCalendars(auth);

    const calendarInfoPromises: Promise<GetCalendar>[] = [];
    const eventsPromises: Promise<GetEvents>[] = [];
    const calendarObjs = calendars.forEach((calendar: calendar_v3.Schema$CalendarListEntry) => {
      if (!calendar.id) {
        throw new Error('Missing calendar id');
      }
      calendarInfoPromises.push(this.getCalendar(auth, calendar.id));
      eventsPromises.push(this.getEvents(auth, calendar.id));
    });
    // return Promise.all(calendarInfoPromises).then((calObjs) => {
    //   return calObjs.map((calObj) => {
    //     return calObj.calendarInfo.then((calInfo) => {
    //       return calObj.events.then(events => ({
    //         events,
    //         ...calInfo
    //       }));
    //     });
    //   });
    // });
    return Promise.all([
      Promise.all(calendarInfoPromises),
      Promise.all(eventsPromises),
    ]).then(([calendarInfo, events]: [GetCalendar[], GetEvents[]]) => {
      // assert(calendarInfo.length === events.length, 'Lengths of calendarInfo and events are not the same!');
      return calendarInfo.map((value: GetCalendar, i) => {
        return {
          ...value,
          ...events[i],
        };
      });
    });
  }
}
