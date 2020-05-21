import { useState, useEffect } from 'react';

import { Subject } from 'rxjs';

interface Authentication {
  authenticated: boolean;
  error: { error: string; message: string } | false;
}

const authentication = new Subject<Authentication>();

function mockAuthenticate() {
  if (Math.random() > 0.5) {
    // Success
    return fetch('http://www.mocky.io/v2/5ec62ee63200007000d74afd');
  }

  // Error
  return fetch('http://www.mocky.io/v2/5ec62c223200007900d74ae0');
}

export function useAuthentication(): [Authentication, () => void, () => void] {
  const [authenticated, setAuthenticated] = useState({
    authenticated: false,
    error: false,
  } as Authentication);

  useEffect(() => {
    const sub = authentication.subscribe({
      next: (authenticationState) => {
        setAuthenticated(authenticationState);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const login = async () => {
    try {
      const res = await mockAuthenticate();

      const body = await res.json();

      if (res.ok) {
        authentication.next({ authenticated: true, error: false });
      } else {
        authentication.next({
          authenticated: false,
          error: body,
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      authentication.next({
        authenticated: false,
        error: { error: 'unexepted_error', message: 'Unexpected error' },
      });
    }
  };

  const logout = () => {
    authentication.next({ authenticated: false, error: false });
  };

  return [authenticated, login, logout];
}

export default useAuthentication;
