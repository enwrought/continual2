import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ParsingTextbox from './ParsingTextbox';
import { ClientReduxStore } from '../redux/types';
import { getEntryInfo } from '../redux/diary/selectors';

interface Action {
  type: string;
  payload: {
    body: string
  };
}

// const NEW_ENTRY_ID = 'NEW_ENTRY';

interface PropsFromReduxState {
  initValue: string;
  readOnly: boolean;
}

interface PropsFromDispatch {
  // createNewEntryIfNeeded: () => Action;
  saveToServer: (title: string, text: string) => Action;
}

type JoinedProps = PropsFromReduxState & PropsFromDispatch;

// This typescript inheritance feels backwards - FTProps should not have to depend on the parent
// but it's probably okay since we won't use FormattingTextboxChild outside of the hoc
// If we do, we can create a separate component that wraps around the child component
// TODO: only expose required typescript props and not internal child props
interface FTProps extends JoinedProps {
  // readonly id: string;
}

interface FTState {
  currentText: string;
  savedText: string;
  savedTime: Date;
}

// TODO: generalize the Hashtag component later?
// interface Formatter {
//   pattern: RegExp,
//   splitPattern?: RegExp
// }
class FormattingTextboxChild extends React.PureComponent<FTProps, FTState> {

  state = {
    currentText: '',
    savedText: '',
    savedTime: new Date()
  };

  onProcess = (value: string) => {
    // TODO: implement
    const { saveToServer } = this.props;
    this.setState(
      {
        currentText: value
      },
      () => {
        console.log('sending');
        saveToServer('Temporary title...', value);
      }
    );
  }

  onSave = (value: string) => {
    // TODO: save and then update state when sucessful
    const { saveToServer } = this.props;

    this.setState(
      {
        savedText: value,
        savedTime: new Date()
      },
      () => {
        console.log('sending');
        saveToServer('Temporary title...', value);
      }
    );
  }

  componentWillReceiveProps(nextProps: FTProps) {
    // const { createNewEntryIfNeeded } = this.props;
    // createNewEntryIfNeeded();
    this.setState({ currentText: nextProps.initValue });
  }

  render() {
    const { readOnly } = this.props;
    const { currentText } = this.state;

    return (
      <ParsingTextbox
        classNames="formatting-textbox"
        onProcess={this.onProcess}
        onSave={this.onSave}
        readOnly={readOnly}
        value={currentText}
      />
    );
  }
}

const FormattingTextbox = connect<PropsFromReduxState, PropsFromDispatch, void>(
  (state: ClientReduxStore) => {
    const initValue = getEntryInfo(state).entry.text;
    const readOnly = state.diary.drafts.get('server').status !== 'OK';

    return {
      initValue,
      readOnly
    };
  },
  (dispatch: Function) => ({
    // createNewEntryIfNeeded: () => dispatch({ type: 'CREATE_NEW_ENTRY_IF_NEEDED' }),
    // TODO: should this save to state first and then try to indirectly call to save to server?
    saveToServer: (title: string, text: string) => dispatch({ type: 'UPDATE_ENTRY', payload: { title, text } }),
  })
)(FormattingTextboxChild);

export default FormattingTextbox;
