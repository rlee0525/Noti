import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import styles from '../styles/main';

// main app components
import App    from './app';
import Splash from './splash';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path='/' component={ Splash } />
        <Route path='/app' component={ App } />
      </Router>
    </Provider>
  );
};

export default Root;
