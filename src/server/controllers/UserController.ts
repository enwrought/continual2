import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';

import { EntryService, UserService } from '../services';
import { User, Entry } from '../entities';
import {
  CreateUserDTO,
  GetEntriesQuery,
  ModifyEntryDTO,
  OptionalErrorResponse,
  PublicUserInfoDTO,
  ReturnEntriesShortDTO
} from '../dto';

@ApiBearerAuth()
@ApiUseTags('diary')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly entryService: EntryService) {}

  @Post()
  @ApiOperation({ title: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Successfully created new user.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async createUser(@Body() body: CreateUserDTO): Promise<InsertResult> {
    // TODO: this is boilerplate for all endpoints - we should just autolog
    // every request (endpoint, params, headers, body, etc) somewhere
    console.log({ body, action: 'createUser' });
    const response = this.userService.createUser(body);
    return response;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get information about a user' })
  @ApiResponse({ status: 200, description: 'OK', type: PublicUserInfoDTO })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async getUser(@Param('id') id: string): Promise<PublicUserInfoDTO> {
    console.log({ id, action: 'getUser' });
    const user = await this.userService.getUser(id);
    return new PublicUserInfoDTO(user);
  }

  @ApiOperation({ title: 'Get a list of user entries' })
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 404, description: 'Could not find user.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @Get(':id/entries')
  async getEntriesShort(
    @Param('id') id: string,
    @Query() query: GetEntriesQuery
  ): Promise<ReturnEntriesShortDTO[]> {
    console.log({ id, query, action: 'getEntriesShort' });
    return this.entryService.getEntriesShort(id, query.length, query.includeDrafts);
  }

  @ApiOperation({ title: 'Create a new entry.' })
  @ApiResponse({ status: 201, description: 'Successfully created entry.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @Post(':id/entries')
  async createEntry(@Param('id') id: string, @Body() body: ModifyEntryDTO) {
    console.log({ id, body, action: 'createEntry' });
    return this.entryService.createEntry(id, body).catch((err) => {
      console.log({ err });
      // TODO: STORY - move error messages to common lib (also typescript them to identify how many str args)
      throw new HttpException(`Could not find user with id '${id}'.`, HttpStatus.NOT_FOUND);
    });
  }

  @ApiOperation({ title: 'Make a call to start synchronize with Google Calendar.' })
  @ApiResponse({ status: 201, description: 'Successfully updated with google calendar.' })
  @Post(':id/calendars')
  async importCalendar(@Param('id') id: string, @Body() body: ImportCalendarDTO) {
    console.log({ id, body, action: 'importCalendar' });

    // TODO: this should just update the calendar

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
    return;
  }
}
