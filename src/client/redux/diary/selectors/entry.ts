import { ClientReduxStore } from '../../types';

// TODO: break this up into smaller sections so that reselect caching will better handle
//       changes to the different parts of the store
export const getEntryInfo = (store: ClientReduxStore) => ({
  user: store.user,
  entry: store.diary.drafts.get('items')[store.diary.latestDraft] || { title: '', text: '' }
});

export const getLatestDraft = (store: ClientReduxStore) => {
  return store.diary.latestDraft;
};
