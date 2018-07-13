import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { User } from '../../entities/User';

export class PublicUserInfoDTO {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  bio: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.bio = user.bio;
  }
}
