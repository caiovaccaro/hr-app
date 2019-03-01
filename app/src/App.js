import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import List from './pages/List';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={List} />
  </Switch>
);

export default App;
