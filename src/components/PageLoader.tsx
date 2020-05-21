import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export function PageLoader() {
  return (
    <Backdrop open invisible>
      <CircularProgress />
    </Backdrop>
  );
}

export default PageLoader;
