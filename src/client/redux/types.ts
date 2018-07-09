import { Map, Record } from 'immutable';

interface UserInfo {
  name: string;
  username: string;
  dob?: Date;
}

interface Entry {
  title: string;
  text: string;
  date: Date;
}

interface ServerStatus {
  status: string;
  statusLastUpdate?: Date;
}

interface EntryState {
  server: ServerStatus;
  items: {
    [key: string]: Entry;
  };
}

const entryStateDefaults = {
  server: {
    status: 'OK'
  },
  items: Map(),
};

export class EntryStoreRecord extends Record(entryStateDefaults) {
  constructor(params: EntryState) {
    super(params);
  }
  get<T extends keyof EntryState>(value: T): EntryState[T] { 
    return super.get(value);
  }
}

interface DiaryStore {
  drafts: EntryStoreRecord;
  /**
   * Key of the last edited draft in drafts
   */
  latestDraft: string;
  entries: EntryStoreRecord;
}

// export type EntryStore = Record<any, EntryState>;

// TODO: merge types with server somehow
// TODO: divide into the states corresponding to each reducer
// TODO: decide on policy on what is stored in the state. This likely needs to be PWA-like
export interface ClientReduxStore {
  // TODO: if needed, split to diary/calendar/other
  user: UserInfo;
  diary: DiaryStore;
}
