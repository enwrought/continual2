import * as React from 'react';
import { ParsingTextbox } from '../components';

export default class TagPage extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="main-page">
        Welcome! Enter today's log.
        {/* TODO: save into redux? */}
        <ParsingTextbox
          onProcess={(value) => { console.log(value); }}
          onSave={(value) => { console.log(`Saved: ${value}`); }}
        />
      </div>
    );
  }
}
