import { all } from 'redux-saga/effects';

import { watchNewEntry } from './entry';

export function* diarySaga() {
  yield all([
    watchNewEntry()
  ]);
}
