import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class GetEntriesQuery {
  @ApiModelPropertyOptional({ description: 'Number of characters to truncate each entry.', default: 40 })
  length?: number;

  @ApiModelPropertyOptional({ description: 'Whether to include drafts (unpublished entries', default: false })
  includeDrafts?: boolean;
}
