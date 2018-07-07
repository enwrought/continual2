import * as React from 'react';
import { FormattingTextbox, ParsingTextbox, ConnectedSavedEntry } from '../components';
// import { FormattingTextbox } from '../components/FormattingTextbox';

export const MainPage: React.SFC = () => {
  return (
    <div className="main-page">
      Welcome! Write about your life.
      {/* TODO: format all stuff under a single container. */}
      <ConnectedSavedEntry />
      <FormattingTextbox />
    </div>
  );
};
