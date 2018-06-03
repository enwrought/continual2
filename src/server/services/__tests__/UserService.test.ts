import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { UserService } from '../UserService';
import { EntryRepository, UserRepository, TagRepository } from '../serviceHelpers';
import { Entry, User } from '../../entities';
import { setupApp, removeEntries, teardownApp } from '../../__tests__/testHelpers';

describe('UserService', () => {
  let app: INestApplication;
  let entryRepository: EntryRepository;
  let tagRepository: TagRepository;
  let userRepository: UserRepository;
  let userService: UserService;

  beforeAll(async () => {
    app = await setupApp();

    entryRepository = app.get(EntryRepository);
    userRepository = app.get(UserRepository);
    tagRepository = app.get(TagRepository);

    userService = app.get(UserService);
  });

  it('Create user', async () => {
    // TODO: find some better way to have separate databases with services
    // or some way to mock properly (cannot mock just single function since otherwise will get back bad data?)
    // const user = new User({
    //   bio: '',
    //   name: 'some name',
    //   username: 'cow',
    // });
    // await userRepository.insert(user);
    // const users = await userRepository.find();
    // expect(users.length).toBe(1);
  });

  describe('Happy paths', () => {
  });

  afterEach(async () => {
    await removeEntries(entryRepository);
    await removeEntries(tagRepository);
    await removeEntries(userRepository);
  });

  afterAll(async () => {
    await teardownApp(app);
  });
});
