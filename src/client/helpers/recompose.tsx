import * as React from 'react';
import { withProps } from 'recompose';

const withGrid = <T extends {}>(BaseComponent: React.SFC<T>) => {
  // TODO: implement this Grid wrapper?
  // TODO: implement this as a render prop?
  return null;
};

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

// TODO: this makes more sense as a separate class instead of HOC enhancer
/**
 * Adds a prop `onLatestUpdate`, which triggers if there has been no more action after `delay` seconds
 * @param delay 
 */
export const withDelay = <T extends {}>(propFnName: string, delay: number) => 
  (BaseComponent: React.ComponentClass<T>) => {
    class WrappedComponent extends React.Component<T> {
      timer = 0;

      constructor(props: T) {
        super(props);
        this.update = this.update.bind(this);
      }

      update() {
        console.log('Entering update()...');

        const { [propFnName]: onLatestUpdate } = this.props;
        if (this.timer) {
          console.log(`Clearing timer ${this.timer}`);
          clearTimeout(this.timer);
          this.timer = 0;
        }
        this.timer = setTimeout(
          () => {
            console.log(`Executing onLatestUpdate with timer ${this.timer}...`);
            onLatestUpdate.apply(null, arguments);
            this.timer = 0;
          },
          delay
        );
      }

      render() {
        // Spread does not work with generics in typescript
        const otherProps = Object.assign({}, this.props);
        delete otherProps[propFnName];

        const updateProps = { [propFnName]: this.update };
        return (
          <BaseComponent {...otherProps} {...updateProps} />
        );
      }
    }
    return WrappedComponent;
  };
