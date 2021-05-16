import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://anushkumar629.netlify.com">
        Map.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const alertError = (text) =>
    toast.error(text, {
      position: toast.POSITION.TOP_RIGHT,
    });

  const [loginCredentials, setLoginCredentials] = useState({
    userId: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Sign In | Welcome to Map.io';
    return () => {
      setLoginCredentials({
        userId: '',
        password: '',
      });
    };
  }, []);

  function handleLoginDetails(event) {
    event.persist();
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('Users'));
    // console.log(loginCredentials)
    if (users) {
      const currentUser = users.filter((items) => {
        return items.userName === loginCredentials.userId ||
          items.email === loginCredentials.userId
          ? items
          : '';
      });
      // console.log(currentUser)
      if (currentUser.length > 0) {
        if (currentUser[0].password === loginCredentials.password) {
          // console.log("have fun")
          localStorage.setItem(
            'token',
            JSON.stringify({
              token: currentUser[0].userName,
              name: currentUser[0].name,
            })
          );
          history.push('/home');
        } else {
          // console.log("no no your are not allowed")
          alertError("Oh gosh password's wrong");
        }
      } else {
        // console.log("please register and try")
        alertError('You must register first');
        setLoginCredentials({
          userId: '',
          password: '',
        });
      }
    } else {
      alertError('You must register first');
      setLoginCredentials({
        userId: '',
        password: '',
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={loginCredentials.userId}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="Email Address or User Name"
            name="userId"
            onChange={handleLoginDetails}
            autoComplete="off"
            autoFocus
          />
          <TextField
            value={loginCredentials.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleLoginDetails}
            id="password"
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                onClick={() => {
                  history.push('/signup');
                }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
