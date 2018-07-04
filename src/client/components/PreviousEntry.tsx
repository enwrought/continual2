import * as React from 'react';

interface SavedEntryProps {
  date: Date;
  title: string;
  text: string;
}

export default class PreviousEntry extends React.PureComponent<SavedEntryProps, {}> {

  render() {
    const { date, title, text } = this.props;

    // TODO: globalize date string?
    // TODO: relative time?
    const dateString = date.toLocaleDateString();
    return (
      <div>
        Entry
      </div>
    );
  }
}
