import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Dashboard } from '../../pages/Dashboard';
import { Form } from '../../pages/Form';

export const Routes = () =>
  <Switch>
    <Route exact path='/'><Redirect to='/dashboard' /></Route>
    <Route exact path='/dashboard'>
      <Dashboard />
    </Route>
    <Route exact path='/validator'>
      <Form />
    </Route>
    <Route path='*'><Redirect to='/dashboard' /></Route>
  </Switch>;