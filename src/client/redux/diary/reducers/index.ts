import { combineReducers } from 'redux';
import { Redux } from 'lib';

import { entryReducer } from './entry';

export const diaryReducer = combineReducers({
  entry: entryReducer
});
