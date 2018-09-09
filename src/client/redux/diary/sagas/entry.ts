import { put, takeLatest, select } from 'redux-saga/effects';

import { CommonActions } from '../../common/actions';
import { ContentActions } from '../actions';
import { getEntryInfo, getLatestDraft, getAllDrafts } from '../selectors';
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
      endpoint: `users/${userInfo.id}/entries?includeDrafts=true&length=0`,
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
    date: number;
    title: string;
    text: string;
    publish?: boolean;
  };
}

function* updateEntry(action: UpdateEntryAction) {
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

function* publishEntry(action: UpdateEntryAction) {
  yield console.log('TODO');
  const entryId = yield select(getLatestDraft);
  // const entryContent = yield select(getEntryInfo);
  const date = action.payload.date ? {} : { date: Date.now() };
  const newEntryContent = {
    ...action.payload,
    ...date,
    publish: true
  };
  
  yield put({
    // TODO: rename FETCH_FROM_SERVER, this isn't quite what it does
    type: CommonActions.FETCH_FROM_SERVER,
    payload: {
      endpoint: `entries/${entryId}`,
      method: 'PATCH',
      body: newEntryContent,

      // TODO: the on____ is boilerplate, maybe wrap this in a function to fix
      onSuccessActionType: ContentActions.PUBLISH_ENTRY_ON_SERVER_SUCCESS,
      onHttpErrorActionType: ContentActions.PUBLISH_ENTRY_ON_SERVER_FAILURE,
      onOtherErrorActionType: ContentActions.PUBLISH_ENTRY_ON_SERVER_FAILURE,
    }
  });

  yield put({
    type: ContentActions.MOVE_DRAFT_TO_PUBLISHED,
    payload: {
      entries: [
        {
          ...newEntryContent,
          entryId,
        }
      ]
    }
  });
}

function* updateLatestDraftAfterPublish() {
  const drafts = yield select(getAllDrafts);
  yield put({
    type: ContentActions.UPDATE_LATEST_DRAFT_AFTER_PUBLISH,
    payload: Object.keys(drafts.items).map(key => drafts.itmes[key])
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

export function* watchPublishEntry() {
  yield takeLatest(ContentActions.PUBLISH_ENTRY_ON_SERVER, publishEntry);
}

export function* watchInitializeStore() {
  yield takeLatest(ContentActions.INITIALIZE_STORE, initializeStore);
}

export function* watchMoveDraftToPublished() {
  yield takeLatest(ContentActions.MOVE_DRAFT_TO_PUBLISHED, updateLatestDraftAfterPublish);
}
