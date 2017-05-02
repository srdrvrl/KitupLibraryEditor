import React from 'react';
import Router from 'react-router/BrowserRouter';
import { render } from 'react-dom';
import Parse from 'parse';
import App from './components/App';

Parse.initialize('kitup-parse-hfdjk34R#$Tgr3');
Parse.serverURL = 'http://kitup-parse.herokuapp.com/parse';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
