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

export const TagPage: React.SFC<Page> = (props: Page) => {
  const [tag, ...subtags] = props.match.params['0'].split('/');

  // TODO: use hashtag split helper
  return (
    <div>
      Tag:&nbsp;
      <HashtagComponent tag={tag} subtags={subtags} />
    </div>
  );
};
