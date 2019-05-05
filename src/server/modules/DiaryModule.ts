import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService, EntryService, GoogleCalendarService, GoogleAuthService } from '../services';
import { UserController, EntryController } from '../controllers';
import { User, Entry, Tag } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Entry, Tag])],
  providers: [UserService, EntryService, GoogleCalendarService, GoogleAuthService],
  controllers: [UserController, EntryController],
})
export default class DiaryModule {}
