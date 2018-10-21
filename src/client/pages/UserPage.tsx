import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserComponent } from '../components';

// TODO: export this somewhere

interface Param {
  // Match the first "**"
  '0': string;
}

interface Page extends RouteComponentProps<Param> {
}

// TODO: TASK connect to redux and list all entries in store with tag
// TODO: STORY implement as a popup side-panel with more information, ie: drill-down
export const UserPage: React.SFC<Page> = (props: Page) => {
  const userName = props.match.params['0'];

  return (
    <div>
      User:&nbsp;
      <UserComponent userName={userName} />
    </div>
  );
};
