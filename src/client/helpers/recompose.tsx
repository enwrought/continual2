import * as React from 'react';
import { withProps } from 'recompose';

// TODO: HOC to render a specific component type of component if it does not exist

/**
 * Maps an array of props for `BaseComponent` to a array of `BaseComponents` wrapped in
 * React Fragment
 * @param BaseComponent Base component to wrap in HOC
 */
export const toReactFragments = <T extends {}>(BaseComponent: React.SFC<T>) => {
  const arrayToDOM = (listOfProps: { items: T[]}) => {
    return listOfProps.items.map((props: T, index) => <BaseComponent key={index} {...props} />);
  };
  return (listOfProps: { items: T[] }) => (
    <React.Fragment>
      {arrayToDOM(listOfProps)}
    </React.Fragment>
  );
};

export interface WithDelayProps {
  onTimerAction: () => void;
}

/**
 * Adds a prop `onLatestUpdate`, which triggers if there has been no more action after `delay` seconds
 * @param delay 
 */
// export const withDelay = <T extends WithDelayProps>(delay: number) => 
//   (BaseComponent: React.ComponentClass<T, {}>) => {
//     class WrappedComponent extends React.Component<T> {
//       timer: NodeJS.Timeout | null = null;

//       constructor(props: T) {
//         super(props);
//         this.update = this.update.bind(this);
//       }

//       update() {
//         console.log('Entering update()...');

//         const { onTimerAction } = this.props;
//         if (this.timer) {
//           console.log(`Clearing timer ${this.timer}`);
//           clearTimeout(this.timer);
//           this.timer = null;
//         }
//         this.timer = setTimeout(
//           () => {
//             console.log(`Executing onLatestUpdate with timer ${this.timer}...`);
//             onTimerAction.apply(null, arguments);
//             this.timer = null;
//           },
//           delay
//         );
//       }

//       render() {
//         return (
//           <BaseComponent
//             {...this.props}
//             onTimerAction={this.update}
//           />
//         );
//       }
//     }
//     return WrappedComponent;
//   };

export interface WithDelayProps {
  delay: number;
  onTimerAction: () => void;
  render: () => React.ReactNode;
}

export class WithDelay extends React.PureComponent<WithDelayProps, {}> {
  timer: number = 0;

  update() {
    const { delay, onTimerAction } = this.props;

    console.log('Entering update()...');
    if (this.timer) {
      console.log(`Clearing timer ${this.timer}`);
      clearTimeout(this.timer);
      this.timer = 0;
    }

    // TODO: vscode uses NodeJS syntax highlighting, figure out how to switch to browser
    this.timer = setTimeout(
      () => {
        console.log(`Executing onLatestUpdate with timer ${this.timer}...`);
        onTimerAction.apply(null, arguments);
        this.timer = 0;
      },
      delay
    );
  }

  render() {
    return this.props.render();
  }
}