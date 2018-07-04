import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { MainPage, TagPage } from '../pages';

export const AppMain: React.SFC = () => {
  return (
    <div className="app-main">
      <Switch>
        <Route exact={true} path="/" component={MainPage} />
        <Route exact={true} path="/tags" component={TagPage} />
        <Route path="/tags/**" component={TagPage} />
      </Switch>
    </div>
  );
};
