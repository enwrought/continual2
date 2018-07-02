import * as React from 'react';
import { FormattingTextbox, ParsingTextbox } from '../components';
// import { FormattingTextbox } from '../components/FormattingTextbox';

export default class TagPage extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="main-page">
        Welcome! Enter today's log.
        {/* TODO: save into redux? */}
        <FormattingTextbox />
      </div>
    );
  }
}
