import * as React from 'react';
import { Route, Switch } from 'react-router';

import { MainPage, TagPage, UserPage, ImportPage, RedirectPage } from '../pages';

export const AppMain: React.SFC = () => {
  return (
    <div className="app-main">
      <Switch>
        <Route exact={true} path="/" component={MainPage} />
        <Route exact={true} path="/tags" component={TagPage} />
        <Route exact={true} path="/receive" component={RedirectPage} />
        <Route path="/import" component={ImportPage} />
        <Route path="/import/**" component={ImportPage} />
        <Route path="/tags/**" component={TagPage} />
        <Route path="/user/**" component={UserPage} />
      </Switch>
    </div>
  );
};
