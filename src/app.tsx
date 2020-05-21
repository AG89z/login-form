import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuthentication } from './utils/authentication';
import { delayLazy } from './utils/delayLazy';

const delayReady = 1000;

const LoginPage = delayLazy(() => import('./pages/login'), delayReady);
const DashboardPage = delayLazy(() => import('./pages/dashboard'), delayReady);
const NotFoundPage = delayLazy(() => import('./pages/404'), delayReady);

function Loader() {
  return (
    <Backdrop open invisible>
      <CircularProgress />
    </Backdrop>
  );
}

export default function App() {
  const auth = useAuthentication();

  return (
    <>
      <CssBaseline />
      <Router>
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </Router>
    </>
  );
}
