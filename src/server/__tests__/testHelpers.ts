/**
 * Helper functions to be used for tests only.
 */

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection, Repository, BaseEntity } from 'typeorm';

// import { ApplicationModule, getTestApplicationModule } from '../ApplicationModule';
import { ApplicationModule } from '../ApplicationModule';
import DiaryModule from '../modules/DiaryModule';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Imports the default ApplicationModule and return the NestApplication instance.
 */
// export async function setupApp(name: string = 'someName'): INestApplication {
export async function setupApp(): INestApplication {
  const module = await Test.createTestingModule({
    // imports: [getTestApplicationModule(name)],
    imports: [ApplicationModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return app;
}

/**
 * Closes the NestApplication and TypeORM connection.
 * @param app NestApplication instance created in the test.
 */
export async function teardownApp(app: INestApplication) {
  const connection = app.get(Connection);
  await connection.close();
  await app.close();
}

/**
 * 
 * @param repo Repository to remove entries
 * @param log whether to log deleted entries
 */
export async function removeEntries(repo: Repository<T>, log: boolean = true): Promise<T[]> {
  // Clear the database (Repository.clear() gives issues because of many/many relationship)
  await repo.find().then((elems: T[]) => {
    if (log) {
      // TODO: decide how to do logging and save with CI
      console.log(`Deleting elements from ${repo.metadata.name} repository.`);
      console.log(elems);
    }
    return repo.remove(elems);
  }).catch(console.log);
}
