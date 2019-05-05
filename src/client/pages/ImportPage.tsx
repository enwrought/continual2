import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// TODO: export this somewhere

interface Param {
  // Match the first "**"
  '0': string;
}

interface Page extends RouteComponentProps<Param> {
}

// TODO: connect to redux and list all entries in store with tag
// export const ImportPage: React.SFC<Page> = (props: Page) => {
//   const googleId = props.match.params['0'];

//   return (
//     <div>
//       User:&nbsp;
//       {googleId}
//     </div>
//   );
// };

export class ImportPage extends React.PureComponent<Param> {
  // importer = new GoogleCalendarImporter();

  render() {
    return (
      <div>
        Import page.
      </div>
    );
  }
}
