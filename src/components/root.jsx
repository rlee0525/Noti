import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import styles from '../styles/main';

// main app components
import App            from './app';

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
      </Route>
    </Router>
  </Provider>
);

export default Root;
