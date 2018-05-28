import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateEntryDTO {
  @ApiModelProperty({ description: 'Title of entry', default: '' })
  readonly title: string;

  @ApiModelProperty({ description: 'Content', default: '' })
  readonly text: string;

  @ApiModelPropertyOptional({ description: 'If true, will publish and make public.', default: false })
  readonly publish?: boolean;
}
