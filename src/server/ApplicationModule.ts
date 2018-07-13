import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import uuid from 'uuid';

import DiaryModule from './modules/DiaryModule';
import { Tag, Entry, User } from './entities';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.host || 'localhost',
    port: 3306,
    username: process.env.username || 'root',
    password: process.env.password || 'root',
    database: process.env.database || (process.env.NODE_ENV === 'test' ? 'test' : ''),
    entities: [User, Tag, Entry],
    synchronize: true,
    keepConnectionAlive: true,
    retryAttempts: 2,
    retryDelay: 1000,
    logging: false
    // logging: true,
    // logger: 'file'
  }), DiaryModule],
})
export class ApplicationModule {}

// export function getTestApplicationModule(dbName: string) {
//   // Create db
//   // TODO: create db

//   if (process.env.NODE_ENV !== 'test') {
//     console.warn('Should not use getTestApplicationModule() for non-test.');
//     return @Module({
//       imports: [TypeOrmModule.forRoot({
//         // name: 'UsersConnection',
//         type: 'mysql',
//         // host: process.env.host || 'localhost',
//         host: 'localhost',
//         port: 3306,
//         // username: process.env.username || '',
//         // password: process.env.password || '',
//         // database: process.env.database || '',
//         username: 'root',
//         password: 'root',
//         // database: 'test2',
//         database: dbName,
//         entities: [User, Tag, Entry],
//         synchronize: true,
//         keepConnectionAlive: true,
//         retryAttempts: 2,
//         retryDelay: 1000,
//         logging: false
//         // logging: true,
//         // logger: 'file'
//       }), DiaryModule],
//     })
//     class ApplicationModule {};
//   }

//   // return class with options

// }
