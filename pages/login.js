import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useState, useContext } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Mail, Lock } from "@material-ui/icons";
import { auth, db } from "../lib/firebase";
import DisplayMessage from "../helpers/snackbar";
import ProfileContext from "../context/profile";
import Link from "next/link";
import { useRouter } from "next/router";
function Login() {
  const route = useRouter();
  const { profile, setProfile } = useContext(ProfileContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const loggedUser = await auth.signInWithEmailAndPassword(email, password);

      db.collection("Profiles")
        .get()
        .then((docSnap) => {
          docSnap.docs.forEach((item) => {
            if (item.data().uid == loggedUser.user.uid) {
              setProfile({
                ...item.data(),
                email: loggedUser.user.email,
              });
            }
          });
        });
      setDisplay(!display);
      setDisplayMessage(`Welcome ${loggedUser.user.displayName}`);

      //   console.log("this is new user", loggedUser);
      route.replace("/");
    } catch (error) {
      console.log(error);
      setDisplay(!display);
      setDisplayMessage(error.message);
    }
  };
  return (
    <>
      <Container className="my-4 py-4">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography variant="h3">
              Log In
              <hr />
            </Typography>
          </Grid>

          <Grid item container justify="center" spacing={1} alignItems="center">
            <Grid item>
              <AccountCircleIcon style={{ fontSize: "30" }} />
            </Grid>
            <Grid item>
              <input
                type="email"
                className="login__input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container justify="center" spacing={1} alignItems="center">
            <Grid item>
              <Lock style={{ fontSize: "30" }} />
            </Grid>
            <Grid item>
              <input
                type="password"
                className="login__input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          {/* {display ? (
            <Grid item>
              <Typography variant="caption" style={{ color: "red" }}>
                {displayMessage.message}
              </Typography>
            </Grid>
          ) : (
            ""
          )} */}
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Grid>
          <Typography variant="button">Do not have an account?</Typography>
          <Link href="/signup">Create an account</Link>
        </Grid>
      </Container>
      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </>
  );
}

export default Login;
