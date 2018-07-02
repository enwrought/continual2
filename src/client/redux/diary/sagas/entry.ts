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

const getEntryInfo = (store: ClientReduxStore) => ({
  user: store.user,
  entry: store.drafts[store.latest_draft] || { title: '', text: '' }
});

function* newEntry() {
  const info = yield select(getEntryInfo);
  yield put({
    type: CommonActions.FETCH_FROM_SERVER,
    payload: {
      endpoint: `users/${info.user.id}/entries`,
      body: {
        title: info.entry.title || '',
        text: info.entry.text || ''
      }
    }
  });
}

export function* watchNewEntry() {
  yield takeLatest(ContentActions.CREATE_NEW_ENTRY, newEntry);
}
