import { getRepository } from 'typeorm';

// TODO: refactor into repository
import { User, Entry } from '../api/entity';



interface EntryValues {
  author: User,
  created: Date,
  published: Date,
  title: string,
  text: string
}

function setEntryValues(entry: Entry, entryValues: EntryValues) {
  entry.author = entryValues.author;
  entry.created = entryValues.created;
  entry.published = entryValues.published;
  entry.title = entryValues.title;
  entry.text = entryValues.text;
}

export default class EntryService {

  constructor() {}

  createEntry(userId: string, entryValues: EntryValues) {
    const entry = new Entry();
    setEntryValues(entry, entryValues);

    return getRepository(User).findOneOrFail(userId).then((user: User) => {
      if (user.entries) {
        user.entries.push(entry);
      } else {
        user.entries = [entry];
      }
      return getRepository(User).save(user);
    });
  }

  getEntriesShort(userId: string, length = 40) {
    return getRepository(User).findOneOrFail(userId).then(user => {
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
}