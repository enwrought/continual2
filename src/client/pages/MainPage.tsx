import * as React from 'react';
import { FormattingTextbox, ParsingTextbox } from '../components';
// import { FormattingTextbox } from '../components/FormattingTextbox';

export default class MainPage extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="main-page">
        Welcome! Write about your life.
        {/* TODO: save into redux? */}
        <FormattingTextbox />
      </div>
    );
  }
}
