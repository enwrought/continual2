export const ContentActions = {
  CREATE_NEW_ENTRY_IF_NEEDED: 'CREATE_NEW_ENTRY_IF_NEEDED',
  CREATE_NEW_ENTRY: 'CREATE_NEW_ENTRY',
  SAVE_ENTRY: 'SAVE_ENTRY',
  UPDATE_ENTRY: 'UPDATE_ENTRY',

  INITIALIZE_STORE: 'INITIALIZE_STORE',

  LOAD_USER_FROM_SERVER: 'LOAD_USER_FROM_SERVER',

  LOAD_ENTRIES_FROM_SERVER: 'LOAD_ENTRIES_FROM_SERVER',
  LOAD_ENTRIES_FROM_SERVER_SUCCESS: 'LOAD_ENTRIES_FROM_SERVER_SUCCESS',
  LOAD_ENTRIES_FROM_SERVER_FAILURE: 'LOAD_ENTRIES_FROM_SERVER_FAILURE',

  SAVE_ENTRY_FROM_SERVER: 'SAVE_ENTRY_FROM_SERVER',
  SAVE_ENTRY_FROM_SERVER_SUCCESS: 'SAVE_ENTRY_FROM_SERVER_SUCCESS',
  SAVE_ENTRY_FROM_SERVER_FAILURE: 'SAVE_ENTRY_FROM_SERVER_FAILURE',

  UPDATE_ENTRY_ON_SERVER: 'UPDATE_ENTRY_ON_SERVER',
  UPDATE_ENTRY_ON_SERVER_SUCCESS: 'UPDATE_ENTRY_ON_SERVER_SUCCESS',
  UPDATE_ENTRY_ON_SERVER_FAILURE: 'UPDATE_ENTRY_ON_SERVER_FAILURE',
};

// TODO: merge this with DTO
export interface SaveEntryFromServerAction {
  // TODO: this should only be SAVE_ENTRY_FROM_SERVER_SUCCESS - find some way to merge this
  type: string;
  payload: {
    id: string;
    title: string;
    text: string;
  };
}

export interface ReturnEntryShort {
  title: string;
  text: string;
  date: number;
  isDraft: boolean;
  entryId: string;
}

export interface RetrieveEntriesFromServerAction {
  type: string;
  payload: ReturnEntryShort[];
}
