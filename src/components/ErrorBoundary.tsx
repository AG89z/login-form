import React from 'react';

import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    textAlign: 'center',
  },

  errorIcon: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.h2.fontSize,
  },
}));

function ErrorScreen() {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Container maxWidth="xs">
        <ErrorIcon className={classes.errorIcon} />
        <Typography variant="h5">
          An unexpected error occurred: please reload the page or contact the
          page administrator
        </Typography>
      </Container>
    </div>
  );
}

interface Props {}

interface State {
  error: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);

    this.state = { error: false };
  }

  componentDidCatch() {
    // Send to Sentry or other services

    this.setState({ error: true });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return <ErrorScreen />;
    }
    return children;
  }
}

export default ErrorBoundary;
