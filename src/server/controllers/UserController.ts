import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';

import { EntryService, UserService, GoogleAuthService, GoogleCalendarService } from '../services';

import { User, Entry } from '../entities';
import {
  CreateUserDTO,
  GetEntriesQuery,
  ImportCalendarDTO,
  ModifyEntryDTO,
  OptionalErrorResponse,
  PublicUserInfoDTO,
  ReturnEntriesShortDTO
} from '../dto';

@ApiBearerAuth()
@ApiUseTags('diary')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly entryService: EntryService,
    private readonly calendarService: GoogleCalendarService,
    private readonly authService: GoogleAuthService
  ) {}

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

  @ApiOperation({ title: 'Make a call to authorize Google calendar services.' })
  @Get(':id/auth')
  async getGoogleAuthURL(@Param('id') id: string) {
    console.log({ id, action: 'getGoogleAuthURL' });
    return this.calendarService.getGoogleAuthUrl('http://localhost:8080/receive');
  }
 
  @ApiOperation({ title: 'Make a call to start synchronize with Google Calendar.' })
  @ApiResponse({ status: 201, description: 'Successfully updated with google calendar.' })
  @Post(':id/calendars')
  async importCalendar(@Param('id') id: string, @Body() body: ImportCalendarDTO) {
    console.log({ id, body, action: 'importCalendar' });
    this.calendarService.refreshCalendar(body.calendarId, body.token);

    // TODO: this should just update the calendar
    return;
  }
}
