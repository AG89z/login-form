import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';

import CssBaseline from '@material-ui/core/CssBaseline';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}