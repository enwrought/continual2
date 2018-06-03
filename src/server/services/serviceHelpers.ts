import { Repository } from 'typeorm';
import { User, Entry, Tag } from '../entities';

// To deal with testing Repository mocker
export class UserRepository extends Repository<User> { }
export class EntryRepository extends Repository<Entry> { }
export class TagRepository extends Repository<Tag> { }
