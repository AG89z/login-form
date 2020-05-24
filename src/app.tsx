import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { PageLoader } from './components/PageLoader';

import { useAuthentication } from './utils/authentication';
import { lazyAfter } from './utils/lazyAfter';

const delayReady = 1000;

const LoginPage = lazyAfter(() => import('./pages/login'), delayReady);
const DashboardPage = lazyAfter(() => import('./pages/dashboard'), delayReady);
const NotFoundPage = lazyAfter(() => import('./pages/404'), delayReady);

export default function App() {
  const auth = useAuthentication();

  return (
    <>
      <CssBaseline />
      <Router>
        <Suspense fallback={<PageLoader />}>
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
