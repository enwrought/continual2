import { all } from 'redux-saga/effects';

import { watchNewEntry, watchLoadEntries } from './entry';

export function* diarySaga() {
  yield all([
    watchNewEntry(),
    watchLoadEntries()
  ]);
}
