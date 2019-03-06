import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import List from './pages/List';
import User from './pages/User';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={List} />
    <Route path="/user/create" component={User} />
    <Route path="/user/:id" component={User} />
  </Switch>
);

export default App;
