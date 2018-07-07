import * as React from 'react';

const withGrid = <T extends {}>(BaseComponent: React.SFC<T>) => {
  // TODO: implement this Grid wrapper?
  return null;
};

// TODO: HOC to render a specific component type of component if it does not exist

/**
 * 
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
