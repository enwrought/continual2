import * as React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Textbox from './Textbox';
import Hashtag from './Hashtag';
import * as HashtagHelper from '../../lib/helpers/hashtag';

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
    this.setState({ text }, () => this.updateTimer(text));
  }

  onClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onSave } = this.props;
    const { text } = this.state;
    onSave(text);
  }

  render() {
    const { text } = this.state;

    // TODO - update only after the delay
    const stuff = HashtagHelper.parseHashtags(text);
    console.log({stuff});
    const content = stuff.map((str, index) => {
      if (str && str.substr(0,1) !== '#') {
        return str;
      } else {
        const [tag, ...subtags] = HashtagHelper.splitHashtag(str) || [''];
        return <Hashtag tag={tag} subtags={subtags} key={ index } />
      }
    })

    return (
      <Form>
        <div>
          { content }
        </div>
        <FormGroup>
          <Input type="textarea" value={text} onChange={this.update} />
          <Button onClick={this.onClick}>Save</Button>
        </FormGroup>
        <Textbox />
      </Form>
    );
  }
}

// ParsingTextbox.defaultProps = {
//   delay: DEFAULT_DELAY
// };
