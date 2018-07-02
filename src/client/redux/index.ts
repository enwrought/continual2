import { all } from 'redux-saga/effects';

import { Redux } from 'lib';

import { combineReducers } from 'redux';
import { commonSaga } from './common/sagas';
import { diarySaga } from './diary/sagas';
import { diaryReducer } from './diary/reducers';

export const reducers = combineReducers({
  // TODO: implement grabbing user info
  user: Redux.createReducer(
    {
      id: 'DUMMY_ID',
      username: 'i_am_a_dummy',
      name: 'Dummy Bot'
    },
    {}
  ),
  entries: diaryReducer,
  drafts: diaryReducer
});

export function* rootSaga() {
  yield all([
    commonSaga(),
    diarySaga()
  ]);
}
