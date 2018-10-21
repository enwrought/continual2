import { google } from 'googleapis';

import User from '../entities/User';
import { CalendarService, CalendarInfo, EventInfo } from './CalendarService';

export class GoogleCalendarService implements CalendarService<CalendarInfo, EventInfo> {
  // TODO: THIS STORY - figure out if we can re-use the same Google Calendar instance
  // for different users/authorizations? otherwise we need to rethink this

  constructor() {
    super();
    this.calendar = new google.calendar({ version: 'v3' });
  }
  addCalendar(user: User, calendarInfo: CalendarInfo) {
    return new Promise();
  }

  // TODO: Auth client or API Key for the request
  // auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;
  async getCalendar(auth: string, calendarId: string) {
    return await this.calendar.calendars.get(
      { auth, calendarId }
    ).then(calendar => ({
      title: calendar.summary || '',
      description: calendar.description || ''
    }));
  }

  // TODO: STORY - Update from saved sync token
  async getCalendars(auth: string, savedSyncToken?: string) {
    // TODO: use savedSyncToken
    let token = '';
    let syncToken = '';
    const calendars = [];
    do {
      await this.addCalendar.calendarList.list({
        // TODO: options
        maxSize: 2500,
      }).then((calendarList) => {
        const { items, nextPageToken, nextSyncToken } = calendarList;
        calnedars += items;
        token = nextPageToken;
        syncToken = nextSyncToken;
      });
    } while (token);

    // TODO: what is the return signature of this?
    return {
      syncToken,
      calendars
    };
  }

  async getEvents(auth: string, calendarId: string, savedSyncToken?: string) {
    let token = '';
    let syncToken = '';

    const calendarEvents = [];
    do {
      await this.addCalendar.events.list({
        // TODO: options
        calendarId,
        maxSize: 2500,
        // timezone
        // syncToken: savedSyncToken (?????)
      }).then((eventsWrapper) => {
        const { events, nextPageToken, nextSyncToken } = eventsWrapper;
        calendarEvents += events;
        token = nextPageToken;
        syncToken = nextSyncToken;
      });
    } while (token);

    return {
      calendarEvents,
      syncToken
    };
  }

  /**
   * This needs to happen every so often to keep the calendar up to date.
   * We need to deal with recalculating possible times to put stuff.
   *
   * We also need to return info to update any info next
   * @param calendarId Id of the calendar
   */
  refreshCalendar(calendarId: string, syncToken?: string) {
    if (!syncToken) {
      // Do full sync
      return this.fullSync(calendarId);
    }
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
  
    return new Promise();
  }
  addEvent(calendarId: string, eventInfo: EventInfo) {
    return new Promise();
  }
}