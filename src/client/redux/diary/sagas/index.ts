import { all } from 'redux-saga/effects';

import {
  watchNewEntry,
  watchNewEntryIfNeeded,
  watchLoadEntries,
  watchUpdateEntry,
  watchInitializeStore,
  watchFinishLoadFromServer,
  watchPublishEntry
} from './entry';

export function* diarySaga() {
  yield all([
    watchNewEntryIfNeeded(),
    watchNewEntry(),
    watchLoadEntries(),
    watchUpdateEntry(),
    watchPublishEntry(),
    watchInitializeStore(),
    watchFinishLoadFromServer()
  ]);
}
