
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

// TODO: STORY - generalize this for non-Google events?
export class ImportCalendarDTO {
  @ApiModelProperty()
  readonly token: string;

  @ApiModelProperty()
  readonly calendarId: string;
}
