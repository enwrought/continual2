import { Redux } from 'lib';
import { CommonActions, FetchFromServerAction } from '../../common/actions';

interface FetchingState {
  status: string;
}

const entriesReducer = {
  [CommonActions.FETCH_FROM_SERVER]: (state: FetchingState, action: FetchFromServerAction) =>
    ({ status: 'FETCHING' }),
};

const defaultState: FetchingState = { status: 'OK' };

export const entryReducer = Redux.createReducer(defaultState, entriesReducer);
