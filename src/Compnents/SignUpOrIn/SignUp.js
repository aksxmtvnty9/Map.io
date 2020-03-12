import React,{useEffect,useState} from 'react';
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
import SignInLoader from '../Loader/SignInLoader'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://anuskumar629.netlify.com">
        Map.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const alertError = (text) => toast.error(text, {
    position: toast.POSITION.TOP_RIGHT
  });
  const alertSuccess = (text) => toast.success(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000
  });

  const [loading,setLoading] = useState(true);
  const [userDetails,setUserDetails] = useState({
      name:"",
      userName:"",
      email:"",
      password:""
  })

  const [notify,setNotify]=useState("empty");

  useEffect(() => {
    toast.configure({
        autoClose: 2000,
        draggable: false,
        //etc you get the idea
    });
    setTimeout(() => {
        setLoading(prev=>{return prev=false})
    }, 1000);
  }, [])

  function setAuthDetails(event){
    setUserDetails({...userDetails,[event.target.name]:event.target.value})
  }

  function checkAuthDetails(event){
    event.persist()
    const authDetails = JSON.parse(localStorage.getItem('Users'));
    let values = []
    if(authDetails){
        // console.log(authDetails)
        if(event.target.value === userDetails[event.target.name] && userDetails[event.target.name].length>0){
            // eslint-disable-next-line array-callback-return
            authDetails.map(items=>{
                values.push(items[event.target.name])
            })
            if(event.target.name === "name"){
                setUserDetails({...userDetails,"userName":userDetails.name.toLowerCase().replace(/\s/g,'')})
            }
            else{
                if(values.indexOf(userDetails[event.target.name])<0){
                    // console.log("unique")
                    setNotify(prev=>{
                        return prev = "t"+event.target.name
                    })
                }
                else{
                    setUserDetails({...userDetails,[event.target.name]:""})
                    setNotify(prev=>{
                        return prev = "f"+event.target.name
                    })
                }
            }
        }
    }else{
        if(event.target.name === "name"){
            setUserDetails({...userDetails,"userName":userDetails.name.toLowerCase().replace(/\s/g,'')})
        }
    }
  }
  function pushUsers(event){
    event.preventDefault()
    let users = JSON.parse(localStorage.getItem('Users'));
    let flag = false;
    for(let i in userDetails){
        if(userDetails[i].length>0){
            flag=true
        }
        else{
            flag=false;
            break;
        }
    }
    if(flag){
        if(users){
            users.push(userDetails)
            localStorage.setItem("Users",JSON.stringify(users))
            setUserDetails({
                name:"",
                userName:"",
                email:"",
                password:""
            })
            setNotify(prev=>prev="empty")
            alertSuccess("Hurray..Log in and have our features at your finger tips")
            // console.log("user added")
        }   
        else{
            localStorage.setItem("Users",JSON.stringify([userDetails]))
            setUserDetails({
                name:"",
                userName:"",
                email:"",
                password:""
            })
            setNotify(prev=>prev="empty")
            // console.log("user added")
            alertSuccess("Hurray..Log in and have our features at your finger tips")
        }
    }
    else{
        // console.log("fill all the fields")//toast here
        alertError("Fill all the fields");
    }
  }

  function spanAlert(){
      if(notify.substr(0,1) === "t"){
          return <span className="alert-span success">What a spectacular {notify.substr(1,)}!!</span>
      }
      else if(notify.substr(0,1) === "f"){
          return <span className="alert-span danger">{notify.substr(1,)} already exists, please choose a unique one.</span>
      }
  }

  function loadMain(){
      if(loading){
          return (
              <div style={{textAlign:"center"}}>
                  <SignInLoader/>
              </div>
            )
      }
      else{
        return(
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h6" variant="subtitle1">
                Welcome, Sign up and have our features!
                </Typography><br/>
                <form className={classes.form} noValidate>
                {spanAlert()}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={setAuthDetails} 
                        onBlur={checkAuthDetails}
                        value={userDetails.name}             
                        autoComplete="off"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={setAuthDetails}
                        onBlur={checkAuthDetails}   
                        value={userDetails.userName}
                        variant="outlined"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoComplete="off"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        value={userDetails.email}  
                        onChange={setAuthDetails}
                        onBlur={checkAuthDetails} 
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        onChange={setAuthDetails}
                        value={userDetails.password}
                        variant="outlined"
                        required
                        fullWidth
                        minLength="8"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={pushUsers}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" onClick={()=>{history.push("/")}} variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>  
        </Container>
        )
      }
  }
  return (
      <>
        {loadMain()}
    </>
  );
}