import { put, takeLatest, select } from 'redux-saga/effects';
import { CommonActions } from '../../common/actions';
import { ContentActions } from '../actions';
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

// TODO: break this up into smaller sections so that reselect caching will better handle
//       changes to the different parts of the store
const getEntryInfo = (store: ClientReduxStore) => ({
  user: store.user,
  entry: store.diary.drafts[store.diary.latestDraft] || { title: '', text: '' }
});

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

export function* watchNewEntry() {
  yield takeLatest(ContentActions.CREATE_NEW_ENTRY, newEntry);
}

export function* watchLoadEntries() {
  yield takeLatest(ContentActions.LOAD_ENTRIES_FROM_SERVER, loadEntries);
}