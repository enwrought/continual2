import { all, takeEvery } from 'redux-saga/effects';

import { FetchFromServerAction, CommonActions } from '../actions/commonActions';

function* startCommonSagas() {
  yield console.log('Loaded common sagas');
}

const URL = process.env.SERVER_URL || 'http://localhost:3000';

// TODO: this needs to save the result
function* fetchFromServer(action: FetchFromServerAction) {
  yield fetch([URL, action.payload.endpoint].join('/'));
}

// TODO: ignore this right now, just make the call directly when saving
// and maybe migrate the delay to saga instead of the component??
/**
 * Make a request and return the result
 * Needs to update store with state (CALLING, )
 */
function* watchFetchFromServer() {
  yield takeEvery(CommonActions.FETCH_FROM_SERVER, fetchFromServer);
}

export function* commonSaga() {
  yield all([
    startCommonSagas(),
    watchFetchFromServer()
  ]);
}
