/**
 * Service interacting with users. Later, should also handle interacting with connections,
 * ie: create account with facebook, connect to calendars, etc.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities';
import { CreateUserDTO } from '../dto';
import { UserRepository } from './serviceHelpers';
import { InsertResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  createUser(userInfo: CreateUserDTO): Promise<InsertResult> {
    const user = new User(userInfo);

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
