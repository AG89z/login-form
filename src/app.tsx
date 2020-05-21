import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/404';

import { useAuthentication } from './utils/authentication';

export default function App() {
  const auth = useAuthentication();

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            {auth.authentication.authenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route path="/dashboard">
            {!auth.authentication.authenticated ? (
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
