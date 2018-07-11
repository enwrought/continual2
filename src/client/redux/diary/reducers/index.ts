import { combineReducers } from 'redux';

import { draftReducer, entriesReducer, latestDraftReducer } from './entry';

export const diaryReducer = combineReducers({
  drafts: draftReducer,
  entries: entriesReducer,
  latestDraft: latestDraftReducer
});
