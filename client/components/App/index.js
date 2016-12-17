import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import HomePage from '../../pages/HomePage';
import EditorPage from '../../pages/EditorPage';
import NotFoundPage from '../../pages/NotFoundPage';

import './global-styles';

const App = () => (
  <div>
    <Match exactly pattern="/" component={HomePage} />
    <Match pattern="/editor" component={EditorPage} />
    <Miss component={NotFoundPage} />
  </div>
);

export default App;
