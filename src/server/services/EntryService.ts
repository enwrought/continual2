import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, Entry } from '../entities';
import { CreateEntryDTO, ReturnEntriesShortDTO } from '../dto';

function setEntryValues(entry: Entry, entryValues: CreateEntryDTO) {
  const currTime = new Date();
  entry.created = currTime;
  entry.title = entryValues.title || '';
  entry.text = entryValues.text || '';
  entry.lastUpdated = currTime;

  if (entryValues.publish) {
    // By default, isDraft is true, published is false
    entry.published = currTime;
    entry.isDraft = false;
  }
}

@Injectable()
export default class EntryService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>
  ) {}

  /**
   * Create a new entry. Expected flow is creating a draft as empty entry
   * or entry with some default text/title. On server side, default the created
   * and updated time.  Publication should happen on the save endpoint.
   * @param userId User creating entry
   * @param entryValues Body containing initial text
   */
  createEntry(userId: string, entryValues: CreateEntryDTO) {
    const entry = new Entry();
    setEntryValues(entry, entryValues);

    return this.userRepository.findOneOrFail(userId).then((user: User) => {
      entry.author = user;
      return this.entryRepository.save(entry);
    });
  }

  /**
   * Get a truncated version of entries for user.
   *
   * TODO: paging/limiting to latest number of entries
   * TODO: other summary options, ie: tags, calendar events when they are available
   * @param userId Entries are from this user
   * @param length Max number of characters before truncating the entry text 
   */
  getEntriesShort(userId: string, length = 40): Promise<ReturnEntriesShortDTO[]> {
    return this.userRepository.findOneOrFail(userId).then(user => {
      const entries = user.entries || [];
      const items = entries
        .filter((entry) => !entry.isDraft && entry.isPublic)
        .map(entry => ({
          entry_id: entry.id,
          title: entry.title,
          date: entry.created,
          text: entry.text.substr(0, length)
        }));
        return items;
    });
  }

  getEntry(entry_id: string) {
    return this.entryRepository.findOneOrFail(entry_id);
  }
}
