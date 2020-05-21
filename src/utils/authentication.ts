import { useState, useEffect } from 'react';

import { Subject } from 'rxjs';

interface Authentication {
  authenticated: boolean;
  error: string | false;
}

const authentication = new Subject<Authentication>();

function fakeAuthenticate() {
  if (Math.random() > 0.5) {
    return fetch('http://www.mocky.io/v2/5ec557d72f0000c9e5dc31aa');
  }
  
  return fetch('http://www.mocky.io/v2/5ec568793000006a00bc5a45');
}

export function useAuthentication(): [Authentication, () => void, () => void] {
  const [authenticated, setAuthenticated] = useState({
    authenticated: false,
    error: false,
  } as Authentication);

  useEffect(() => {
    authentication.subscribe({
      next: (authenticationState) => {
        setAuthenticated(authenticationState);
      },
    });
  }, []);

  const login = async () => {
    try {
      const res = await fakeAuthenticate();

      if (res.ok) {
        authentication.next({ authenticated: true, error: false });
      } else {
        authentication.next({
          authenticated: false,
          error: `Error ${res.status}`,
        });
      }
    } catch (error) {
      console.log(error);
      authentication.next({
        authenticated: false,
        error: 'Unexpected error',
      });
    }
  };

  const logout = () => {
    authentication.next({ authenticated: false, error: false });
  };

  return [authenticated, login, logout];
}
