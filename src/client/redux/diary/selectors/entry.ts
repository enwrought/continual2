import { ClientReduxStore } from '../../types';

export const getAllDrafts = (store: ClientReduxStore) => store.diary.drafts.toJS();

// TODO: break this up into smaller sections so that reselect caching will better handle
//       changes to the different parts of the store
export const getEntryInfo = (store: ClientReduxStore) => ({
  user: store.user,
  entry: store.diary.drafts.get('items')[store.diary.latestDraft] || { title: '', text: '', date: new Date(0) }
});

export const getLatestDraft = (store: ClientReduxStore) => {
  return store.diary.latestDraft;
};
