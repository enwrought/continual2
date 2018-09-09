import * as moment from 'moment';
import * as React from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
// TODO: figure out best way in using classnames.bind() and bind with styles
import * as cx from 'classnames';

import { Hashtag, Size } from '../../lib';
import { HashtagComponent } from './HashtagComponent';

interface ParsingTextboxProps {
  value?: string;
  delay?: number;
  onProcess: (value: string) => void;
  onSave: (value: string) => void;
  classNames?: string;
  readOnly?: boolean;
}

interface ParsingTextboxState {
  text: string;
}

const DEFAULT_DELAY = 500;

// TODO: implement this as a SFC with a render prop handling the on delay (or move the on delay to redux saga)
export default class ParsingTextbox extends
                     React.PureComponent<ParsingTextboxProps> {

  static defaultProps = {
    // delay: DEFAULT_DELAY
    delay: 0
  };

  lastProcessedValue = this.props.value || '';
  timer = 0;
  lastSaveTime = new Date();

  updateTimer = (value: string) => {
    const { delay, onProcess } = this.props;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(
      () => {
        onProcess(value);
        this.lastProcessedValue = value;
        this.lastSaveTime = new Date();
      },
      delay
    );
  }

  update = (newValue: React.FormEvent<HTMLInputElement>) => {
    const text = newValue.currentTarget.value;
    this.updateTimer(text);
  }

  onClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onSave } = this.props;
    onSave(this.lastProcessedValue);
  }

  render() {
    const { classNames, readOnly = false, value = '' } = this.props;

    // TODO: draft.js/ parse line breaks as <p> + </p>
    // TODO: - update only after the delay
    const stuff = Hashtag.parseHashtags(value);

    const content = stuff.map((str, index) => {
      if (str && str.substr(0, 1) !== '#') {
        return str;
      }
      const [tag, ...subtags] = Hashtag.splitHashtag(str) || [''];
      return <HashtagComponent tag={tag} subtags={subtags} key={index} />;
    });

    const combinedClassNames = cx('parsing-textbox', classNames);

    return (
      <Form className={combinedClassNames}>
        <div className="parsing-textbox__preview">
          {content}
        </div>
        <Container>
          <FormGroup>
            <Row noGutters={true}>
              <Col>
                <Input type="textarea" value={value} onChange={this.update} disabled={readOnly} />
              </Col>
            </Row>
            <Row className="parsing-textbox__bottom-bar" noGutters={true}>
              <Col className="parsing-textbox__save-time" xs="9">
                {/* TODO: this probably needs to be passed in */}
                {/* TODO: Relative time needs this to be refreshed every so often... */}
                {`Saved ${moment(this.lastSaveTime).toDate()}.`}
              </Col>
              <Col xs="3" className="parsing-textbox__save-button-col">
                <Button className="parsing-textbox__save-button" size="sm" onClick={this.onClick} disabled={readOnly}>
                  Save
                </Button>
                <Button
                  className="parsing-textbox__publish-button"
                  size="sm"
                  onClick={this.onClick}
                  disabled={readOnly}
                >
                  Publish
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Container>
      </Form>
    );
  }
}
