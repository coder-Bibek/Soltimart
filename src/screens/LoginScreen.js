// importing necessary modules
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import "../style/Loginscreen.css";
import { Link } from "react-router-dom";
import { APP_BASE_URL } from "../Outsource";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="#">
//         SoltiMart
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
// calling main function()
export default function LoginScreen() {
  // array destructuring
  const classes = useStyles();
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    Usersession();
  }, []);
  const displayError = () => {
    // checking regex code
    if (/\S+@\S+\.\S+/.test(email)) {
      loginuser();
    } else {
      setError("invalid email address");
    }
  };
  const Usersession = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      setMsg("");
    } else {
      window.location.href = "/home";
    }
  };
  // checking user login
  const loginuser = async () => {
    await axios
      .post(APP_BASE_URL + "/postadmin", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data === "invalid") {
          console.log("invalid");
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          window.location.href = "/home";
        }
      })
      .catch((err) => {
        if (err) {
          setMsg("Invalid email/password");
        }
      });
  };
  return (
    // taking component from materialUI
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Soltimart
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => Setemail(event.target.value)}
        />
        {error === "" ? (
          <label></label>
        ) : (
          <label
            style={{
              color: "red",
            }}
          >
            {error}
          </label>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => Setpassword(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {msg == "" ? (
          <label></label>
        ) : (
          <label
            style={{
              color: "red",
            }}
          >
            {msg}
          </label>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={displayError}
        >
          Sign In
        </Button>
      </div>
    </Container>
  );
}
