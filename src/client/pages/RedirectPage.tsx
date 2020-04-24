import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface Props extends RouteComponentProps<{}> {
}

export interface State {

}

export class RedirectPage extends React.Component<Props> {

  constructor(props: Props) {
    super(props);

    const search = this.props.location.search;
    if (!search) {
      // TODO: log error
    }
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const scope = params.get("scope");
    console.log(params);

    // TODO: trigger an action to save code into server
  }

  render() {
    // const subdir = props.match.params['0'];

    return (
      <div>
        {/* <div>Code: {code}</div>
        <div>Scope: {scope}</div> */}
      </div>
    );
  }
}
