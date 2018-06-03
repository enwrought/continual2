import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { EntryService } from '../EntryService';
import { EntryRepository, UserRepository, TagRepository } from '../serviceHelpers';
import { Entry, User } from '../../entities';
import { setupApp, removeEntries, teardownApp } from '../../__tests__/testHelpers';

describe('EntryService', () => {
  // let server;
  let app: INestApplication;
  let entryRepository: EntryRepository;
  let tagRepository: TagRepository;
  let userRepository: UserRepository;
  let entryService: EntryService;

  beforeAll(async () => {
    app = await setupApp();
    // server = app.getHttpServer();

    entryRepository = app.get(EntryRepository);
    userRepository = app.get(UserRepository);
    tagRepository = app.get(TagRepository);

    entryService = app.get(EntryService);
  });

  it('Create entry', async () => {
    const user = new User({
      bio: '',
      name: 'some name',
      username: 'cow',
    });
    await userRepository.insert(user);
    const users = await userRepository.find();
    expect(users.length).toBe(1);

    const entryStart = {
      title: 'Californian grass',
      text: 'The grass is quite green.'
    };

    await entryService.createEntry(user.id, entryStart);
    const entries = await entryRepository.find();
    expect(entries.length).toEqual(1);
    expect(entries[0]).toMatchObject({
      title: entryStart.title,
      text: entryStart.text,
      isDraft: true,
      isPublic: false,
      published: null
    });
  });

  describe('Happy paths', () => {
    it('Create, update twice, publish', async () => {
      const user = new User({
        bio: '',
        name: 'some name',
        username: 'cow',
      });
      await userRepository.insert(user);
  
      const entryStart = {
        title: 'Californian grass',
        text: 'The grass is quite green.'
      };
  
      await entryService.createEntry(user.id, entryStart);
      const entries = await entryRepository.find();
      expect(entries.length).toEqual(1);
    });
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
