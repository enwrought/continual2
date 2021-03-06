import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal } from 'typeorm';

import { UserRepository, EntryRepository } from './serviceHelpers';
import { User, Entry } from '../entities';
import { ModifyEntryDTO, ReturnEntriesShortDTO } from '../dto';

@Injectable()
export class EntryService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Entry)
    private readonly entryRepository: EntryRepository
  ) {}

  /**
   * Create a new entry. Expected flow is creating a draft as empty entry
   * or entry with some default text/title. On server side, default the created
   * and updated time.  Publication should happen on the save endpoint.
   * @param {string} userId User creating entry
   * @param {ModifyEntryDTO} entryValues Body containing initial text
   */
  createEntry(userId: string, entryValues: ModifyEntryDTO) {
    const entry = new Entry(entryValues);

    return this.userRepository.findOneOrFail(userId).then((user: User) => {
      entry.author = Promise.resolve(user);
      return this.entryRepository.save(entry);
    });
  }

  /**
   * Validate an Entry object.  Right now the conditions are:
   * 1. Author exists.
   * 2. Text and title are not empty.
   * 3. Not already published.
   *
   * TODO: is there a need to expose/not expose this function?
   * @param {Entry} entry
   */
  async validateEntry(entry: Entry) {
    const author = Promise.resolve(entry.author);
    console.log({
      author,
      text: entry.text,
      title: entry.title,
      published: entry.published
    });
    // TODO: do we need author?????
    return entry.text && entry.title && !entry.published;
  }

  /**
   * Run validation and publish entry if valid.
   *
   * TODO: Issue #2, finalize design and think about what publication really means.
   * May need to create a new entry that references a published entry.
   *
   * TODO: need to catch error and return OptionalErrResponse
   *
   * @param {Entry} entry Entry to be publish.
   * @throws NotAcceptableException
   */
  publishEntry(entry: Entry) {
    if (!this.validateEntry(entry)) {
      throw new NotAcceptableException('Cannot publish entry...');
    }
    const currTime = new Date();
    entry.published = currTime;
    entry.isDraft = false;
    entry.isPublic = true;

    // TODO: generate short link.  Might need another query to database...
    // Maybe create a query that counts how many entries the user has with the
    // same title. (regex whitespace)
    console.log({ published: entry });
    return this.entryRepository.save(entry);
  }

  /**
   * Update entry. If there are no changes, don't save.
   */
  updateEntry(entryId: string, entryValues: ModifyEntryDTO): Promise<Entry> {
    return this.entryRepository.findOneOrFail(entryId).then(async (entry: Entry) => {
      entry.setValues(entryValues);

      console.log({ entryValues });
      if (entryValues.publish) {
        await this.publishEntry(entry).then(() => {
          console.log({ saved_entry: entry });
        });
        return entry;
      }

      console.log({ entry });
      await this.entryRepository.save(entry).then(() => {
        console.log({ entry });
      });
      return entry;
    });
  }

  /**
   * Get a truncated version of entries for user.
   *
   * TODO: paging/limiting to latest number of entries
   * TODO: other summary options, ie: tags, calendar events when they are available
   * TODO: query to search for entries within some time period
   * @param {string} userId Entries are from this user
   * @param {int} length Max number of characters before truncating the entry text 
   * @param {boolean} includeDrafts Whether to include drafts and non-public entries, needs authentication
   * TODO: authentication
   */
  getEntriesShort(
    userId: string, length: number = 40, includeDrafts: boolean = false
  ): Promise<ReturnEntriesShortDTO[]> {
    return this.entryRepository
      .createQueryBuilder('entry')
      .select()
      .where('entry.authorId = :id', { id: userId })
      .getMany()
      .then((entries: Entry[]) => {
        const items = entries
          .filter(entry => includeDrafts || (!entry.isDraft && entry.isPublic))
          .map(entry => ({
            entryId: entry.id,
            title: entry.title,
            date: entry.createdTime.getTime(),
            text: length <= 0 ? entry.text : entry.text.substr(0, length),
            isDraft: entry.isDraft
          }));
        return items;
      }
    );
  }

  /**
   * Return entry associated to entryId if exists.
   *
   * @param {string} entryId Entry id
   */
  getEntry(entryId: string) {
    return this.entryRepository.findOneOrFail(entryId);
  }
}
