import * as React from 'react';
import { ParsingTextbox } from './components';

export default class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="App">
        <ParsingTextbox
          onProcess={value => { console.log(value); }}
          onSave={() => { return; }}
        />
      </div>
    );
  }
}
