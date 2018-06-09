import * as React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Textbox from './Textbox';
import HashtagComponent from './HashtagComponent';

import { Hashtag, Size } from 'lib';

interface ParsingTextboxProps {
  value?: string;
  delay?: number;
  onProcess: (value: string) => void;
  onSave: (value: string) => void;
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

  // constructor(props: any) {
  //   super(props);
  //   this.update = this.update.bind(this);
  // }

  componentDidMount() {
    console.log({ state: 'did mount', time: new Date() });
  }

  componentWillUnmount() {
    console.log({ state: 'unmounting', time: new Date() });
    clearTimeout(this.timer);
  }

  componentWillUpdate() {
    console.log({ state: 'will update', time: new Date() });
  }

  updateTimer = (value: string) => {
    const { delay, onProcess } = this.props;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(
      () => {
        onProcess(value);
      },
      delay
    );
  }

  update = (newValue: React.FormEvent<HTMLInputElement>) => {
    const text = newValue.currentTarget.value;
    // this.setState({ text });
    // if (this.isMounted()) {
    this.setState({ text }, () => this.updateTimer(text));
    // }
  }

  onClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onSave } = this.props;
    const { text } = this.state;
    onSave(text);
  }

  render() {
    const { text } = this.state;

    // TODO - update only after the delay
    const stuff = Hashtag.parseHashtags(text);
    console.log({ stuff });
    const content = stuff.map((str, index) => {
      if (str && str.substr(0, 1) !== '#') {
        return str;
      }
      const [tag, ...subtags] = Hashtag.splitHashtag(str) || [''];
      return <HashtagComponent tag={tag} subtags={subtags} key={index} />;
    });

    return (
      <Form>
        <div className="parsing__preview">
          <div className="parsing__preview-text">
            Preview
          </div>
          {content}
        </div>
        <FormGroup>
          <Input type="textarea" value={text} onChange={this.update} />
          <div>
            <Button onClick={this.onClick}>Save</Button>
          </div>
        </FormGroup>
        <Textbox />
      </Form>
    );
  }
}

// ParsingTextbox.defaultProps = {
//   delay: DEFAULT_DELAY
// };
