import * as React from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
// TODO: figure out best way in using classnames.bind() and bind with styles
import * as cx from 'classnames';
import { compose, withState, withHandlers } from 'recompose';
import { Hashtag, Size, Parser } from 'lib';

import { HashtagComponent } from './HashtagComponent';
import { withDelay } from '../helpers';
import { UserComponent } from './UserComponent';

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

    // TODO: Maybe better to parse out hashtags and users somewhere else
    const tmp = Parser.parse(value);

    const content = tmp.map((parsedType, index) => {
      const { type, match } = parsedType;
      switch (type) {
        case 'HASHTAG':
          const [tag, ...subtags] = Hashtag.splitHashtag(match) || [''];
          return <HashtagComponent tag={tag} subtags={subtags} key={index} />;
        case 'USER':
          const userName = match.substr(1);
          return <UserComponent userName={match} key={index} />;
        case 'NONE':
        default:
          return <span key={index}>{match}</span>;
      }
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
  withDelay<TextboxProps>('onUpdate', 2500)
);

export const Textbox = enhance(TextboxChild);
