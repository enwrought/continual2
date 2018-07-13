import { put, takeLatest, select } from 'redux-saga/effects';

import { CommonActions } from '../../common/actions';
import { ContentActions } from '../actions';
import { getEntryInfo, getLatestDraft } from '../selectors';
import { ClientReduxStore } from '../../types';

// TODO: merge server-side entities, redux store, saga/action types
// TODO: need to decide how to organize things. Should this really be components saving to Redux store,
//       then sagas also picking up the redux store? (As opposed to store-agnostic sagas)
// TODO: really need to think about this design. extensibility, failure points, etc.
// TODO: reselect caching if necessary
interface NewEntryAction {
  user: {
    id: string;
  };
  entry: {
    title: string;
    text: string;
  };
}

const getUserInfo = (store: ClientReduxStore) => store.user;

// TODO: merge DTO object to same place with server
interface Entry {
  id: string;
  text: string;
  title: string;
  published?: boolean;
}

function putSaveEntry(data: object) {
  console.log(data);
  put({
    type: ContentActions.SAVE_ENTRY_FROM_SERVER_SUCCESS,
    payload: data
  });
}

const putErrorEntry = (data: object) => put({
  type: ContentActions.SAVE_ENTRY_FROM_SERVER_FAILURE
});

function* newEntry() {
  const info = yield select(getEntryInfo);
  yield put({
    type: CommonActions.FETCH_FROM_SERVER,
    payload: {
      endpoint: `users/${info.user.id}/entries`,
      body: {
        title: info.entry.title || '',
        text: info.entry.text || '',
      },
      method: 'POST',
      onSuccessActionType: ContentActions.SAVE_ENTRY_FROM_SERVER_SUCCESS,
      onHttpErrorActionType: ContentActions.SAVE_ENTRY_FROM_SERVER_FAILURE,
      onOtherErrorActionType: ContentActions.SAVE_ENTRY_FROM_SERVER_FAILURE,
    }
  });
}

function* loadEntries() {
  const userInfo = yield select(getUserInfo);

  yield put({
    type: CommonActions.FETCH_FROM_SERVER,
    payload: {
      endpoint: `users/${userInfo.id}/entries?includeDrafts=true`,
      method: 'GET',
      onSuccessActionType: ContentActions.LOAD_ENTRIES_FROM_SERVER_SUCCESS,
      onHttpErrorActionType: ContentActions.LOAD_ENTRIES_FROM_SERVER_FAILURE,
      onOtherErrorActionType: ContentActions.LOAD_ENTRIES_FROM_SERVER_FAILURE,
    }
  });
}

interface UpdateEntryAction {
  type: string;
  payload: {
    title: string;
    text: string;
  };
}

function* updateEntry(action: UpdateEntryAction) {
  yield console.log('TODO');
  const entryId = yield select(getLatestDraft);

  yield put({
    // TODO: rename FETCH_FROM_SERVER, this isn't quite what it does
    type: CommonActions.FETCH_FROM_SERVER,
    payload: {
      endpoint: `entries/${entryId}`,
      method: 'PATCH',
      body: action.payload,

      // TODO: the on____ is boilerplate, maybe wrap this in a function to fix
      onSuccessActionType: ContentActions.UPDATE_ENTRY_ON_SERVER_SUCCESS,
      onHttpErrorActionType: ContentActions.UPDATE_ENTRY_ON_SERVER_FAILURE,
      onOtherErrorActionType: ContentActions.UPDATE_ENTRY_ON_SERVER_FAILURE,
    }
  });
}

function* newEntryIfNeeded() {
  const draftId = yield select(getLatestDraft);
  if (!draftId) {
    // TODO: is this better or is it better to call directly?
    yield put({ type: ContentActions.CREATE_NEW_ENTRY });
  }
}

function* initializeStore() {
  yield put({ type: ContentActions.LOAD_ENTRIES_FROM_SERVER });
}

export function* watchNewEntryIfNeeded() {
  yield takeLatest(ContentActions.CREATE_NEW_ENTRY_IF_NEEDED, newEntryIfNeeded);
}

// TODO: this doesn't feel great, how do we manage what will trigger much later as a result of a single action?
//       what about one-offs?
export function* watchFinishLoadFromServer() {
  yield takeLatest(ContentActions.LOAD_ENTRIES_FROM_SERVER_SUCCESS, newEntryIfNeeded);
}

export function* watchNewEntry() {
  yield takeLatest(ContentActions.CREATE_NEW_ENTRY, newEntry);
}

export function* watchLoadEntries() {
  yield takeLatest(ContentActions.LOAD_ENTRIES_FROM_SERVER, loadEntries);
}

export function* watchUpdateEntry() {
  yield takeLatest(ContentActions.UPDATE_ENTRY, updateEntry);
}

export function* watchInitializeStore() {
  yield takeLatest(ContentActions.INITIALIZE_STORE, initializeStore);
}
