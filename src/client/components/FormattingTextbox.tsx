import * as React from 'react';
import { connect } from 'react-redux';

import ParsingTextbox from './ParsingTextbox';

interface Action {
  type: string;
  payload: {
    body: string
  };
}

// const NEW_ENTRY_ID = 'NEW_ENTRY';

interface PropsFromReduxState {
  initValue: string;
}

interface PropsFromDispatch {
  saveToServer: (text: string) => Action;
}

type JoinedProps = PropsFromReduxState & PropsFromDispatch;

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

interface GlobalState {
  content: 'string';
}

class FormattingTextboxChild extends React.PureComponent<FTProps, FTState> {

  state = {
    savedText: '',
    savedTime: new Date()
  };

  onProcess = (value: string) => {
    // TODO: implement
  }

  onSave = (value: string) => {
    // TODO save and then update state when sucessful
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
    const { initValue } = this.props;
    console.log({ initValue });
    return (
      <ParsingTextbox classNames="formatting-textbox" onProcess={this.onProcess} onSave={this.onSave} />
    );
  }
}

const FormattingTextbox = connect<PropsFromReduxState, PropsFromDispatch, void>(
  (state: GlobalState) => {
    console.log(state);
    return {
      initValue: state.content
    };
  },
  (dispatch: Function) => ({
    saveToServer: (text: string) => dispatch({ type: 'CREATE_NEW_ENTRY' })
  })
)(FormattingTextboxChild);

export default FormattingTextbox;
