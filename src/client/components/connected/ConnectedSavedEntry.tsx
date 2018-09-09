import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { toReactFragments } from '../../helpers';
import { SavedEntryProps, SavedEntry } from '../SavedEntry';
import { ClientReduxStore } from '../../redux/types';

const mapStoreToProps = (store: ClientReduxStore): { items: SavedEntryProps[] } => {
  const entries = Object.keys(store.diary.entries.get('items')).map((entryId: string) => {
    return { ...store.diary.entries.get('items')[entryId], id: entryId };
  }).sort(entry => entry.date.valueOf());

  return { items: entries };
};

const enhance = compose(
  connect(mapStoreToProps),
  toReactFragments
);

export const ConnectedSavedEntry = enhance(SavedEntry);
