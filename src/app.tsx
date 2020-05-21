import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/404';

import CssBaseline from '@material-ui/core/CssBaseline';

import { useAuthentication } from './utils/authentication';

export default function App() {
  const [authentication] = useAuthentication();

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            {authentication.authenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route path="/dashboard">
            {!authentication.authenticated ? (
              <Redirect to="/login" />
            ) : (
              <DashboardPage />
            )}
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
}
