import * as moment from 'moment';
import * as React from 'react';

interface TextStatusBarProps {
  lastSaveTime: Date;
}

const TextStatusBar: React.SFC<TextStatusBarProps> = (props: TextStatusBarProps) => {
  const { lastSaveTime } = this.props;

  return (
    <Row className="text-status-bar__bottom-bar" noGutters={true}>
      <Col className="text-status-bar__save-time" xs="12">
        {/* TODO: this probably needs to be passed in */}
        {/* TODO: Relative time needs this to be refreshed every so often... */}
        {`Saved ${moment(lastSaveTime).toDate()}.`}
      </Col>
    </Row>
  );
};
