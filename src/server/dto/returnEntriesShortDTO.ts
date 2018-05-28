import { ApiModelProperty } from "@nestjs/swagger";

export class ReturnEntriesShortDTO {
  @ApiModelProperty()
  entry_id: string;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  date: Date;

  @ApiModelProperty()
  text: string;
}
