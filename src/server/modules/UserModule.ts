import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService, EntryService } from '../services';
import { UserController } from '../controllers/UserController';
import { User, Entry, Tag } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Entry, Tag])],
  providers: [UserService, EntryService],
  controllers: [UserController],
})
export default class UserModule {}
