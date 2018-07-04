import { fromJS, Record } from 'immutable';

import { Redux } from 'lib';

import { CommonActions, FetchFromServerAction } from '../../common/actions';
import { EntryStoreRecord } from '../../types';
import { ContentActions } from '../actions';
import { SaveEntryFromServerAction } from '../actions/content';

const draftsReducer = {
  // TODO: change this to FETCH_FROM_SERVER_ENTRY action
  [ContentActions.CREATE_NEW_ENTRY]: (state: EntryStoreRecord, action: FetchFromServerAction) => {
    return state.setIn(['server'], { status: 'FETCHING', statusLastUpdate: Date.now() });
  },
  [ContentActions.SAVE_ENTRY_FROM_SERVER_SUCCESS]: (state: EntryStoreRecord, action: SaveEntryFromServerAction) => {
    return state.setIn(
      ['items'],
      { [action.payload.id]: action.payload }
    ).setIn(['server'], { status: 'OK', statusLastUpdate: Date.now() });
  },
  [ContentActions.SAVE_ENTRY_FROM_SERVER_FAILURE]: (state: EntryStoreRecord, action: { type: string }) => {
    return state.setIn(['server'], { status: 'FAILED', statusLastUpdate: Date.now() });
  },
};

// TODO: if necessary move this to Immutable.js
// TODO: this needed to be tested (with immutability if not something like immutable)
const defaultState = new EntryStoreRecord({
  server: {
    status: 'OK',
    statusLastUpdate: undefined,
  },
  items: {}
});

export const draftReducer = Redux.createReducer(defaultState, draftsReducer);
