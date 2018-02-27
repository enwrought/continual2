import React, { PureComponent } from 'react';
import ParsingTextbox from './ParsingTextbox';

interface FTProps {
  date: string; // TODO - convert to Date object type
}

interface FTState {
  savedText: string;
  savedTime: Date;
}

export default class FormattingTextbox extends PureComponent<FTProps, FTState> {

  state = {
    savedText: '',
    savedTime: new Date()
  }

  onProcess = (value: string) => {
    // TODO
  }

  onSave = (value: string) => {
    // TODO save and then update state when sucessful

    this.setState({
      savedText: value,
      savedTime: new Date()
    })
  }

  render() {
    return (
      <ParsingTextbox onProcess={this.onProcess} onSave={this.onSave} />
    );
  }
}