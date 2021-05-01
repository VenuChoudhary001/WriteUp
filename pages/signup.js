import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Mail, Lock } from "@material-ui/icons";
import Link from "next/link";
import ProfileContext from "../context/profile";
import { auth, db } from "../lib/firebase";
import DisplayMessage from "../helpers/snackbar";

const SignUp = () => {
  const route = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setProfile, profile } = useContext(ProfileContext);
  const [display, setDisplay] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await newUser.user.updateProfile({
        displayName: userName,
      });
      db.collection("Profiles").add({
        uid: newUser.user.uid,
        user: newUser.user.displayName,
        imageURL: "",
        bio: "",
      });
      setProfile({
        uid: newUser.user.uid,
        user: newUser.user.displayName,
        email: newUser.user.email,
        imageURL: "",
        bio: "",
      });
      setDisplay(!display);
      setDisplayMessage(`Welcome ${newUser.user.displayName}`);
      route.push("/");
    } catch (error) {
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
              Sign Up
              <hr />
            </Typography>
          </Grid>
          <Grid item container justify="center" spacing={1} alignItems="center">
            <Grid item>
              <AccountCircleIcon style={{ fontSize: "30" }} />
            </Grid>
            <Grid item>
              <input
                type="text"
                className="login__input"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container justify="center" spacing={1} alignItems="center">
            <Grid item>
              <Mail style={{ fontSize: "30" }} />
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
                value={password}
                type="password"
                className="login__input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Grid>

          <Typography variant="button">Already have an account?</Typography>
          <Link href="/login">Log in</Link>
        </Grid>
      </Container>

      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </>
  );
};
export default SignUp;
