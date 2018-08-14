import * as React from 'react';
import { Container } from 'reactstrap';

import { FormattingTextbox, ParsingTextbox, ConnectedSavedEntry } from '../components';
import { ConnectedTextbox } from '../components/connected/ConnectedTextbox';

export const MainPage: React.SFC = () => {
  return (
    <Container className="main-page">
      Welcome! Write about your life.
      {/* TODO: find a better way to get rid of container without having to add "saved-entry" here. */}
      <span className="saved-entry">
        <ConnectedSavedEntry />
      </span>
      <FormattingTextbox />
      <ConnectedTextbox />
    </Container>
  );
};
