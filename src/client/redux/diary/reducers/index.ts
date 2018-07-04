import { combineReducers } from 'redux';
import { Redux } from 'lib';

import { draftReducer } from './entry';

export const diaryReducer = combineReducers({
  drafts: draftReducer
});
