import { combineReducers } from 'redux';
import { Redux } from '../../../../lib';

import { draftReducer, entriesReducer } from './entry';

export const diaryReducer = combineReducers({
  drafts: draftReducer,
  entries: entriesReducer,
});
