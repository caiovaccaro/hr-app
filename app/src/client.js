import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { Provider } from "mobx-react";
import RootStore from "./Store";
import Actions from "./Actions";
import { hydrate } from 'react-dom';

const Store = new RootStore();

hydrate(
  <Provider store={Store} actions={new Actions(Store)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
