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

export default class ParsingTextbox extends
                     React.PureComponent<ParsingTextboxProps, ParsingTextboxState> {

  state = {
    text: this.props.value || ''
  };

  static defaultProps = {
    delay: DEFAULT_DELAY
  };

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
        this.lastSaveTime = new Date();
      },
      delay
    );
  }

  update = (newValue: React.FormEvent<HTMLInputElement>) => {
    const text = newValue.currentTarget.value;
    this.setState({ text }, () => this.updateTimer(text));
  }

  onClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onSave } = this.props;
    const { text } = this.state;
    onSave(text);
  }

  render() {
    const { classNames, readOnly = false } = this.props;
    const { text } = this.state;

    // TODO: draft.js/ parse line breaks as <p> + </p>
    // TODO: - update only after the delay
    const stuff = Hashtag.parseHashtags(text);

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
                <Input type="textarea" value={text} onChange={this.update} disabled={readOnly} />
              </Col>
            </Row>
            <Row className="parsing-textbox__bottom-bar" noGutters={true}>
              <Col className="parsing-textbox__save-time" xs="9">
                {/* TODO: this probably needs to be passed in */}
                {/* TODO: Relative time needs this to be refreshed every so often... */}
                {`Saved ${moment(this.lastSaveTime).fromNow()}.`}
              </Col>
              <Col xs="3" className="parsing-textbox__save-button-col">
                <Button className="parsing-textbox__save-button" size="sm" onClick={this.onClick} disabled={readOnly}>
                  Save
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Container>
      </Form>
    );
  }
}
