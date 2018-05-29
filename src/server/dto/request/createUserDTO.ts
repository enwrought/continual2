import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly dob: string;

  @ApiModelPropertyOptional()
  readonly gender?: string;

  @ApiModelPropertyOptional()
  readonly bio?: string;
}
