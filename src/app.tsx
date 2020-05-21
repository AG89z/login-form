import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { useAuthentication } from './utils/authentication';

function delayLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  ms: number
): React.LazyExoticComponent<T> {
  return lazy(() => from(factory()).pipe(delay(ms)).toPromise());
}

const LoginPage = delayLazy(() => import('./pages/login'), 1000);
const DashboardPage = delayLazy(() => import('./pages/dashboard'), 1000);
const NotFoundPage = delayLazy(() => import('./pages/404'), 1000);

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
