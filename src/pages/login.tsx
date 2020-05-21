import React from 'react';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import LoginForm from '../components/LoginForm';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ag89z/">
        Alberto Giachino
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
});

function LoginPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="xs">
        <LoginForm />
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
