import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

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
import { InsertResult } from 'typeorm';

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
    return this.entryService.getEntriesShort(id, query.length);
  }

  @ApiOperation({ title: 'Create a new entry.' })
  @ApiResponse({ status: 201, description: 'Successfully created entry.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @Post(':id/entries')
  async createEntry(@Param('id') id: string, @Body() body: ModifyEntryDTO) {
    console.log({ id, body, action: 'createEntry' });
    return this.entryService.createEntry(id, body);
  }
}
