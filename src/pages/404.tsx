import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

function NotFoundPage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
        <div>
          <Typography component="h1" variant="h4" className={classes.text}>
            Page not found
          </Typography>
          <Typography component="h2" variant="h5" className={classes.text}>
            404
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
