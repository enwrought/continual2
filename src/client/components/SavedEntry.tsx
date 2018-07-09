import * as React from 'react';
import { Container, Col, Row } from 'reactstrap';
import * as moment from 'moment';

export interface SavedEntryProps {
  date: Date;
  title: string;
  text: string;
}

// TODO: compose with a WithContainer wrapper function?
// TODO: document somewhere that we can only use Rows/Cols to divide things up and make assumptions
//       (or change this if we decide to do something else)
export const SavedEntry: React.SFC<SavedEntryProps> = (props: SavedEntryProps) => {
  const { date, title, text } = props;

  // TODO: globalize date string?
  const momentDate = moment(date);
  const relDate = momentDate.fromNow();
  const completeDate = momentDate.toLocaleString();
  return (
    <React.Fragment>
      <Row className="saved-entry__title-wrapper">
        <Col xs="12" className="saved-entry__title">{title}</Col>
        <div className="saved-entry__date" title={completeDate}>{relDate}</div>
      </Row>
      <Row>
        <Col xs="12" className="saved-entry__description">
          {text}
        </Col>
      </Row>
    </React.Fragment>
  );
};
