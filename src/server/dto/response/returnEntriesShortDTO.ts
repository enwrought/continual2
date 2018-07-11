import { ApiModelProperty } from '@nestjs/swagger';

export class ReturnEntriesShortDTO {
  @ApiModelProperty()
  entryId: string;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  date: number;

  @ApiModelProperty()
  text: string;

  @ApiModelProperty()
  isDraft: boolean;
}
