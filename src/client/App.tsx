import * as React from 'react';

import { AppHeader, AppMain } from './layout';
import { MainPage, TagPage } from './pages';

// TODO: find out best practice for importing CSS files
require('./css/index.scss');

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <AppMain />
      </div>
    );
  }
}
