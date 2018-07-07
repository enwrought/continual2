import { fromJS, Record } from 'immutable';

import { Redux } from '../../../../lib';

import { CommonActions, FetchFromServerAction } from '../../common/actions';
import { EntryStoreRecord } from '../../types';
import { ContentActions } from '../actions';
import { SaveEntryFromServerAction, RetrieveEntriesFromServerAction } from '../actions/content';

const draftsReducerMap = {
  [ContentActions.CREATE_NEW_ENTRY]: (state: EntryStoreRecord, action: FetchFromServerAction) => {
    return state.setIn(['server'], { status: 'CREATING ENTRY', statusLastUpdate: Date.now() });
  },
  [ContentActions.SAVE_ENTRY_FROM_SERVER_SUCCESS]: (state: EntryStoreRecord, action: SaveEntryFromServerAction) => {
    // TODO: deal with problem with nested results in Immutable Record
    return state.setIn(
      ['items'],
      { [action.payload.id]: action.payload }
    ).setIn(['server'], { status: 'OK', statusLastUpdate: Date.now() });
  },
  [ContentActions.SAVE_ENTRY_FROM_SERVER_FAILURE]: (state: EntryStoreRecord, action: { type: string }) => {
    return state.setIn(['server'], { status: 'FAILED', statusLastUpdate: Date.now() });
  },
};

const entriesReducerMap = {
  [ContentActions.LOAD_ENTRIES_FROM_SERVER]: (state: EntryStoreRecord, action: FetchFromServerAction) => {
    return state.setIn(['server'], { status: 'FETCHING ENTRIES', statusLastUpdate: Date.now() });
  },
  [ContentActions.LOAD_ENTRIES_FROM_SERVER_SUCCESS]: (state: EntryStoreRecord,
                                                      action: RetrieveEntriesFromServerAction) => {
    return state.setIn(['items'], action.payload.items).setIn(
      ['server'], { status: 'OK', statusLastUpdate: Date.now() }
    );
  },
};

const defaultState = new EntryStoreRecord({
  server: {
    status: 'OK',
    statusLastUpdate: undefined,
  },
  items: {}
});

const tmpDummyEntryDefaultState = new EntryStoreRecord({
  server: {
    status: 'OK',
    statusLastUpdate: undefined,
  },
  items: {
    someId: {
      date: new Date(),
      title: 'Some saved description',
      text: 'We believe that we can change the things around us in accordance with our desires—we believe it \
        because otherwise we can see no favourable outcome. We do not think of the outcome which generally comes \
        to pass and is also favourable: we do not succeed in changing things in accordance with our desires, but \
        gradually our desires change. The situation that we hoped to change because it was intolerable becomes \
        unimportant to us. We have failed to surmount the obstacle, as we were absolutely determined to do, but \
        life has taken us round it, led us beyond it, and then if we turn round to gaze into the distance of the \
        past, we can barely see it, so imperceptible has it become.',
    },
    someOtherId: {
      date: new Date(),
      title: 'something to do',
      text: 'priority 1: knowing when to edit + make calls to update entry instead of creating new entry on client. \
        Then, retrieve entries properly from server + publish drafts correctly. \
        Then, localstorage + pwa integration.'
    }
  },
});

export const draftReducer = Redux.createReducer(defaultState, draftsReducerMap);
export const entriesReducer = Redux.createReducer(tmpDummyEntryDefaultState, entriesReducerMap);
