import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { EntryService, UserService } from '../services';
import { User, Entry } from '../entities';
import { CreateUserDTO, CreateEntryDTO, ReturnEntriesShortDTO, GetEntriesQuery } from '../dto';

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly entryService: EntryService) {}

  @Post()
  @ApiOperation({title: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Successfully created new user.'})
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async createUser(@Body() body: CreateUserDTO): Promise<any> {
    // TODO: this is boilerplate for all endpoints - we should just autolog
    // every request (endpoint, params, headers, body, etc) somewhere
    console.log({ action: 'createUser', body });
    const response = this.userService.createUser(body);
    return response;
  }

  @Get(':id')
  @ApiOperation({ title: 'Get information about a user' })
  @ApiResponse({ status: 200, description: 'OK'})
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async getUser(@Param('id') id: string): Promise<User> {
    console.log({ action: 'getUser', id })
    return this.userService.getUser(id);
  }

  @ApiOperation({ title: 'Get a list of user entries' })
  @ApiResponse({ status: 200, description: 'OK.'})
  @ApiResponse({ status: 404, description: 'Could not find user.'})
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @Get(':id/entries')
  async getEntriesShort(
    @Param('id') id: string,
    @Query() query: GetEntriesQuery
  ): Promise<ReturnEntriesShortDTO[]> {
    console.log({ action: 'getEntriesShort', id, query });
    return this.entryService.getEntriesShort(id, length);
  }

  @ApiOperation({ title: 'Create a new entry.' })
  @ApiResponse({ status: 201, description: 'Successfully created entry.'})
  @ApiResponse({ status: 500, description: 'Internal error.'})
  @Post(':id/entries')
  async createEntry(@Param('id') id: string, @Body() body: CreateEntryDTO) {
    console.log({ action: 'createEntry', id, body });
    return this.entryService.createEntry(id, body);
  }
}
