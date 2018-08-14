import * as React from 'react';
import { connect } from 'react-redux';
import { compose, withState, pure, lifecycle } from 'recompose';

import { Textbox } from '../Textbox';
import { ClientReduxStore } from '../../redux/types';
import { getEntryInfo } from '../../redux/diary/selectors';
import { render } from '../../node_modules/@types/react-dom';

interface Action {
  type: string;
  payload: {
    body: string
  };
}

interface PropsFromReduxState {
  initValue: string;
  updateTime: number;
  readOnly: boolean;
}

interface PropsFromDispatch {
  // createNewEntryIfNeeded: () => Action;
  saveToServer: (title: string, text: string) => Action;
}

type JoinedProps = PropsFromReduxState & PropsFromDispatch;

interface TextboxChildProps {
  setCurrVal: (text: string) => void;
  currVal: string;
}

interface ConnectedTextboxChildProps extends JoinedProps {
  setCurrVal: (text: string) => void;
  currVal: string;
}

// TODO: change according to Textbox changes
const ConnectedTextboxChild: React.SFC<ConnectedTextboxChildProps> = ({
  initValue, saveToServer, updateTime, ...otherProps
}: ConnectedTextboxChildProps) => {
  return (
    <Textbox
      onUpdate={(value: string) => saveToServer('random title', value)}
      initValue={initValue}
      updateTime={updateTime}
    />
  );
};

// TODO: combine with TextStatusBar and validation?
const enhance = compose(
  connect<PropsFromReduxState, PropsFromDispatch, void>(
    (state: ClientReduxStore) => {
      const entry = getEntryInfo(state).entry;
      const initValue = entry.text;
      const updateTime = Date.parse(`${entry.date}`);
      const readOnly = state.diary.drafts.get('server').status !== 'OK';
  
      return {
        initValue,
        updateTime,
        readOnly
      };
    },
    (dispatch: Function) => ({
      // createNewEntryIfNeeded: () => dispatch({ type: 'CREATE_NEW_ENTRY_IF_NEEDED' }),
      // TODO: should this save to state first and then try to indirectly call to save to server?
      saveToServer: (title: string, text: string) => dispatch({ type: 'UPDATE_ENTRY', payload: { title, text } }),
    })
  )
);

export const ConnectedTextbox = enhance(ConnectedTextboxChild);
