import { useState, useEffect } from 'react';

import { BehaviorSubject } from 'rxjs';

interface Authentication {
  readonly authenticated: boolean;
  readonly user: {
    name: string;
    surname: string;
  } | null;
  readonly errors: { error: string; message: string }[];
}

const authentication$ = new BehaviorSubject<Authentication>({
  authenticated: false,
  user: null,
  errors: [],
});

function mockAuthenticate() {
  if (Math.random() > 0.5) {
    // Success
    return fetch('https://www.mocky.io/v2/5ec655353200007000d74ce5');
  }

  // Error
  return fetch('https://www.mocky.io/v2/5ec62c223200007900d74ae0');
}

export function useAuthentication() {
  const [authentication, setAuthentication] = useState(
    authentication$.getValue()
  );

  useEffect(() => {
    const sub = authentication$.subscribe({
      next: (newAuthentication) => {
        setAuthentication(newAuthentication);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const login = async () => {
    try {
      const res = await mockAuthenticate();

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
        errors: [{ error: 'unexepted_error', message: 'Unexpected error' }],
      });
      return authentication$.value;
    }
  };

  const logout = () => {
    authentication$.next({ authenticated: false, user: null, errors: [] });
    return authentication$.value;
  };

  return Object.freeze({
    authentication,
    login,
    logout,
  });
}

export default useAuthentication;
