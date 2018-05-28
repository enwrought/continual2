import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from './modules/UserModule';
import { Tag, Entry, User } from './entities';

@Module({
  imports: [TypeOrmModule.forRoot({
    // name: 'UsersConnection',
    type: 'mysql',
    host: process.env.host || 'localhost',
    port: 3306,
    username: process.env.username || '',
    password: process.env.password || '',
    database: process.env.database || '',
    entities: [__dirname + '/../**/entities/*{.ts,.js}'],
    synchronize: true,
    logging: false
  }), UserModule],
})
export class ApplicationModule {}
