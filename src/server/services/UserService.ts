/**
 * Service interacting with users. Later, should also handle interacting with connections,
 * ie: create account with facebook, connect to calendars, etc.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities';
import { CreateUserDTO } from '../dto';

function setUserValues(user: User, userValues: CreateUserDTO) {
  const { username, name, dob, gender = 'U', bio = '' } = userValues;

  user.username = username;
  user.name = name;
  user.dob = new Date(dob);
  user.gender = gender;
  user.bio = bio;
  user.createdTime = new Date(Date.now());
}

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(userInfo: CreateUserDTO): Promise<any> {
    const user = new User();
    setUserValues(user, userInfo);

    return this.userRepository.insert(user);
  }

  getUser(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  updateUser(userId: string, userInfo: Partial<User>) {
    // TODO: update user
    return null;
  }
}
