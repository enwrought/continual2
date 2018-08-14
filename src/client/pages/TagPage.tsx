import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { HashtagComponent } from '../components';

// TODO: export this somewhere

interface Param {
  // Match the first "**"
  '0': string;
}

interface Page extends RouteComponentProps<Param> {
}

// TODO: connect to redux and list all entries in store with tag
export const TagPage: React.SFC<Page> = (props: Page) => {
  const [tag, ...subtags] = props.match.params['0'].split('/');

  return (
    <div>
      Tag:&nbsp;
      <HashtagComponent tag={tag} subtags={subtags} />
    </div>
  );
};
