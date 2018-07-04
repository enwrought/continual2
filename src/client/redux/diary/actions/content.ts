export const ContentActions = {
  CREATE_NEW_ENTRY: 'CREATE_NEW_ENTRY',
  SAVE_ENTRY: 'SAVE_ENTRY',
  LOAD_USER_FROM_SERVER: 'LOAD_USER_FROM_SERVER',
  LOAD_ENTRIES_FROM_SERVER: 'LOAD_ENTRIES_FROM_SERVER',

  SAVE_ENTRY_FROM_SERVER: 'SAVE_ENTRY_FROM_SERVER',
  SAVE_ENTRY_FROM_SERVER_SUCCESS: 'SAVE_ENTRY_FROM_SERVER_SUCCESS',
  SAVE_ENTRY_FROM_SERVER_FAILURE: 'SAVE_ENTRY_FROM_SERVER_FAILURE',
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
