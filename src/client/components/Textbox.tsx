import * as React from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
// TODO: figure out best way in using classnames.bind() and bind with styles
import * as cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';
import { Hashtag, Size } from 'lib';

import { HashtagComponent } from './HashtagComponent';
import { withDelay } from '../helpers';

interface TextboxProps {
  initValue?: string;
  classNames?: string;
  readOnly?: boolean;
  onUpdate: (text: string) => void;
  updateTime?: number;
}

interface TextboxPropsWithCurrVal extends TextboxProps {
  setCurrVal?: (text: string) => void;
}

interface TextboxState {
  value: string;
  time: number;
}

// TODO: this should not be a SFC and have fully uncontrolled state. The only way to get updates
// is via an update function that is triggered only after several updates (also helpful for undo-handling if needed)

// Redux-saga will use an additional delay before saving a draft to the server
class TextboxChild extends React.PureComponent<TextboxProps, TextboxState> {

  state = {
    value: this.props.initValue || '',
    time: this.props.updateTime || 0
  };

  updateHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { onUpdate } = this.props;
    const value = event.currentTarget.value;

    this.setState({ value }, () => onUpdate(value));
  }

  // TODO: also handle ID of the textbox in case it changes?
  static getDerivedStateFromProps(props: TextboxProps, state: TextboxState) {
    if (props.updateTime && props.initValue && props.updateTime > state.time) {
      return {
        value: props.initValue,
        time: props.updateTime
      };
    }
    return null;
  }

  render() {
    const { classNames, readOnly = false, ...otherProps } = this.props;
    const { value } = this.state;

    // TODO: draft.js/ parse line breaks as <p> + </p>
    const stuff = Hashtag.parseHashtags(value);

    const content = stuff.map((str, index) => {
      if (str && str.substr(0, 1) !== '#') {
        return str;
      }
      const [tag, ...subtags] = Hashtag.splitHashtag(str) || [''];
      return <HashtagComponent tag={tag} subtags={subtags} key={index} />;
    });

    const combinedClassNames = cx('textbox', classNames);

    // TODO: add something to allow handling "Enter" key
    return (
      <Form className={combinedClassNames}>
        <div className="textbox__preview">
          {content}
        </div>
        <FormGroup>
          <Row noGutters={true}>
            <Col>
              <Input type="textarea" value={value} onChange={this.updateHandler} disabled={readOnly} />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

// TODO: correct inner/outer generic types
const enhance = compose<TextboxProps, TextboxProps>(
  withDelay<TextboxProps>('onUpdate', 1000)
);

export const Textbox = enhance(TextboxChild);
