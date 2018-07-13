import { all, takeEvery, put } from 'redux-saga/effects';

import { FetchFromServerAction, CommonActions } from '../actions/commonActions';

function* startCommonSagas() {
  yield console.log('Loaded common sagas');
}

const URL = process.env.SERVER_URL || 'http://localhost:3000';

// TODO: this needs to save the result
function* fetchFromServer(action: FetchFromServerAction) {
  const content = action.payload.method !== 'GET' ? {
    method: action.payload.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.payload.body) || '{}'
  } : undefined;
  let status: number;
  const nextAction = yield fetch(
    [URL, action.payload.endpoint].join('/'),
    content
  ).then((response) => {
    status = response.status;
    return response.json();
  }).then((data) => {
    // TODO: is this the right way to do this - figure out how to update the correct state
    // by adding into the onSuccess/onHttpError/onOtherError actions?
    console.log({ data });
    if (status >= 200 && status < 300) {
      return {
        type: action.payload.onSuccessActionType,
        payload: data
      };
    }
    return {
      type: action.payload.onHttpErrorActionType,
      payload: data
    };
  }).catch((error) => {
    // TODO: add to error
    console.log({ error });
    return {
      type: action.payload.onOtherErrorActionType,
      payload: error
    };
  });
  yield put(nextAction);
}

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
