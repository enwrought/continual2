import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const rootEl = document.getElementById('app');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require<{default: typeof App}>('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl
    );
  });
}
