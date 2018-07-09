import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ParsingTextbox from './ParsingTextbox';
import { ClientReduxStore } from '../redux/types';

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
  saveToServer: (text: string) => Action;
}

type JoinedProps = PropsFromReduxState & PropsFromDispatch;

// TODO: this typescript thing is backwards - FTProps should not have to depend on the parent
interface FTProps extends JoinedProps {
  // readonly id: string;
}

interface FTState {
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
    savedText: '',
    savedTime: new Date()
  };

  onProcess = (value: string) => {
    // TODO: implement
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
        saveToServer(value);
      }
    );
  }

  render() {
    const { initValue, readOnly } = this.props;
    console.log({ initValue });
    return (
      <ParsingTextbox
        classNames="formatting-textbox"
        onProcess={this.onProcess}
        onSave={this.onSave}
        readOnly={readOnly}
      />
    );
  }
}

const FormattingTextbox = connect<PropsFromReduxState, PropsFromDispatch, void>(
  (state: ClientReduxStore) => {
    const draftId = state.diary.latestDraft;
    const initValue = draftId ? state.diary.drafts.get('items')[draftId].text : '';
    const readOnly = state.diary.drafts.get('server').status !== 'OK';

    return {
      initValue,
      readOnly
    };
  },
  (dispatch: Function) => ({
    saveToServer: (text: string) => dispatch({ type: 'CREATE_NEW_ENTRY' })
  })
)(FormattingTextboxChild);

export default FormattingTextbox;
