import { lazy } from 'react';

import { from, timer, combineLatest } from 'rxjs';

/**
 * Avoids the possible flickering of the Suspense loader
 * by setting a minimum time before resolving the import promise
 * @param factory The React.lazy callback
 * @param ms The minimum time in milliseconds for React.lazy to complete
 */
export function delayLazy<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  ms = 1000
): React.LazyExoticComponent<T> {
  return lazy(() =>
    combineLatest(timer(ms), from(factory()), (n, module) => module).toPromise()
  );
}

export default delayLazy;
