import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { useAuthentication } from '../utils/authentication';
import { validateEmail, validatePassword } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  field: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.success.main,
        borderWidth: '2px',
      },
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    textAlign: 'center',
    minHeight: theme.spacing(4),
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing(4),
  },
}));

interface FormData {
  email: {
    email: string;
    error: string;
    visited: boolean;
  };
  password: {
    password: string;
    error: string;
    visited: boolean;
  };
}

export function LoginForm() {
  const auth = useAuthentication();

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: {
      email: '',
      error: '',
      visited: false,
    },
    password: {
      password: '',
      error: '',
      visited: false,
    },
  } as FormData);

  const onEmailChange = (email: string) =>
    setFormData((prev) => ({
      ...prev,
      email: { ...prev.email, visited: true, email },
    }));

  const onPasswordChange = (password: string) =>
    setFormData((prev) => ({
      ...prev,
      password: { ...prev.password, visited: true, password },
    }));

  const validateAndUpdate = (
    field: 'email' | 'password',
    validator: (value: string) => string
  ) => (value: string) =>
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], error: validator(value) },
    }));

  const validateAndUpdateEmail = validateAndUpdate('email', (email: string) => {
    const res = validateEmail(email);
    if (res === true) {
      return '';
    }
    return res.message;
  });

  const validateAndUpdatePassword = validateAndUpdate(
    'password',
    (password: string) => {
      const res = validatePassword(password);
      if (res === true) {
        return '';
      }
      return res.message;
    }
  );

  const readyToSubmit = () => {
    return (
      formData.email.visited &&
      !formData.email.error &&
      formData.password.visited &&
      !formData.password.error
    );
  };

  const onSubmit = async () => {
    if (!readyToSubmit()) {
      validateAndUpdateEmail(formData.email.email);
      validateAndUpdatePassword(formData.password.password);
      return;
    }

    setLoading(true);

    const authentication = await auth.login(
      formData.email.email,
      formData.password.password
    );

    if (!authentication.authenticated) {
      setLoading(false);
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email.email}
              error={Boolean(formData.email.error)}
              classes={
                (!formData.email.error &&
                  formData.email.visited && {
                    root: classes.field,
                  }) ||
                undefined
              }
              helperText={formData.email.error}
              onChange={(e) => onEmailChange(e.target.value)}
              onBlur={(e) => validateAndUpdateEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password.password}
              error={Boolean(formData.password.error)}
              classes={
                (!formData.password.error &&
                  formData.password.visited && {
                    root: classes.field,
                  }) ||
                undefined
              }
              helperText={formData.password.error}
              onChange={(e) => onPasswordChange(e.target.value)}
              onBlur={(e) => validateAndUpdatePassword(e.target.value)}
            />
          </Grid>
          {auth.authentication.errors.length > 0 && !loading && (
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.error}>
                {auth.authentication.errors.map((error) => (
                  <Typography key={error.error}>{error.message}</Typography>
                ))}
              </Paper>
            </Grid>
          )}
          {loading && (
            <Grid item xs={12}>
              <Container className={classes.loader}>
                <CircularProgress size={20} />
              </Container>
            </Grid>
          )}
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          Log in
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Don&apos;t have an account yet? Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default LoginForm;
