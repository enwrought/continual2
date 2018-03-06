import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainPage, TagPage } from './pages';

export default class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="app">
        <div className="header">
        </div>
        <div className="main">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/tags" component={TagPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
