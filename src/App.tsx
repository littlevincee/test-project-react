import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { DefaultLayout } from './app/layout/DefaultLayout';

export const App = () => (
  <>
    <Router>
      <Switch>
        <DefaultLayout />
      </Switch>
    </Router>
  </>
);