import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

/**
 * For both creating a new entry and editing an existing one.
 */
export class ModifyEntryDTO {
  @ApiModelProperty({ description: 'Title of entry', default: '' })
  readonly title?: string;

  @ApiModelProperty({ description: 'Content', default: '' })
  readonly text?: string;

  @ApiModelPropertyOptional({ description: 'If true, will publish and make public.', default: false })
  readonly publish?: boolean;

  // TODO: add tags
}
