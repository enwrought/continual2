import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { EntryService, UserService } from '../services';
import { User, Entry } from '../entities';
import { ModifyEntryDTO } from '../dto';

@ApiBearerAuth()
@ApiUseTags('diary')
@Controller('entries')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Patch(':entryId')
  @ApiOperation({title: 'Modify an entry.' })
  @ApiResponse({ status: 201, description: 'Successfully saved.' })
  @ApiResponse({ status: 404, description: 'Could not find entry.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async updateEntry(@Param('entryId') entryId: string, @Body() body: ModifyEntryDTO): Promise<any> {
    console.log({ action: 'updateEntry', entryId, body });

    // TODO: update
    return this.entryService.updateEntry(entryId, body);
  }

  // TODO: Move these common descriptions into a messages directory
  @Get(':entryId')
  @ApiOperation({ title: 'Get an entry object;' })
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 404, description: 'Could not find entry.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async getEntry(@Param('entryId') entryId: string) {
    console.log({ action: 'getEntry', entryId });
    return this.entryService.getEntry(entryId);
  }
}
