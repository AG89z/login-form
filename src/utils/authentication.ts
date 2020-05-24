import { useState, useEffect } from 'react';

import { BehaviorSubject } from 'rxjs';

/**
 * Simple function to mock a login request.
 * Returns an error with 50% probability.
 */
// eslint-disable-next-line no-unused-vars
function mockAuthenticate(_email: string, _password: string) {
  if (Math.random() > 0.5) {
    // Success
    return fetch('https://www.mocky.io/v2/5ec655353200007000d74ce5');
  }

  // Error
  return fetch('https://www.mocky.io/v2/5ec62c223200007900d74ae0');
}

/**
 * The authentication state that will be made available
 * to the application via the custom hook useAuthentication()
 */
interface Authentication {
  readonly authenticated: boolean;
  readonly user: {
    name: string;
    surname: string;
  } | null;
  readonly errors: { error: string; message: string }[];
}

/**
 * This observable will be responsible to maintain the
 * authentication state throughout the application
 */
const authentication$ = new BehaviorSubject<Authentication>({
  authenticated: false,
  user: null,
  errors: [],
});

/**
 * Custom hook for retrieving the authentication state
 * and handling login and logout requests
 */
export function useAuthentication() {
  const [authentication, setAuthentication] = useState(
    authentication$.getValue()
  );

  useEffect(() => {
    // Synchronize the local authentication state with
    // the global authentication observable
    const sub = authentication$.subscribe({
      next: (newAuthentication) => {
        setAuthentication(newAuthentication);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await mockAuthenticate(email, password);

      const body = await res.json();

      if (res.ok) {
        authentication$.next({ authenticated: true, user: body, errors: [] });
      } else {
        authentication$.next({
          authenticated: false,
          user: null,
          errors: [body],
        });
      }

      return authentication$.value;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      authentication$.next({
        authenticated: false,
        user: null,
        errors: [{ error: 'UNEXPECTED_ERROR', message: 'Unexpected error' }],
      });
      return authentication$.value;
    }
  };

  const logout = () => {
    authentication$.next({ authenticated: false, user: null, errors: [] });
    return authentication$.value;
  };

  return Object.freeze({
    get authentication() {
      return authentication;
    },
    login,
    logout,
  });
}

export default useAuthentication;
