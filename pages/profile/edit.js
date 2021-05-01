import React, { useState, useContext } from "react";
import { auth, storage } from "../../lib/firebase";
import { v4 as uuidv4 } from "uuid";

import ProfileContext from "../../context/profile";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Grid,
  Icon,
  Typography,
  Container,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { ErrorOutline } from "@material-ui/icons";
import DisplayMessage from "../../helpers/snackbar";
function EditProfile() {
  const { profile, setProfile } = useContext(ProfileContext);
  const route = useRouter();

  if (!profile) {
    return (
      <>
        <Container>
          <div className="edit__unlogged my-4 py-4 text-center">
            <Typography variant="body1">You are not logged In!</Typography>
            <Link href="/login">
              <Typography variant="h6">Log In</Typography>
            </Link>
            <Link href="/signup">
              <Typography variant="h6">Sign Up</Typography>
            </Link>
          </div>
        </Container>
      </>
    );
  }

  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState();
  const [bio, setBio] = useState();

  const [displayMessage, setDisplayMessage] = useState("");
  const [display, setDisplay] = useState(false);

  // const [updatedProfile,setUpdateProfile]=useState();
  const handleSubmit = () => {
    if (profilePic || bio || userName) {
      let storageRef = storage.ref();
      let uploadTask = storageRef
        .child(`profile_pic/${uuidv4()}`)
        .put(profilePic);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          setDisplay(!display);
          setDisplayMessage(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setProfilePicUrl(downloadURL);
            setProfile({
              ...profile,
              userName: userName,
              bio: bio,
              imageURL: downloadURL,
            });
          });
        }
      );
    }
    let user = auth.currentUser;

    user
      .updateProfile({
        displayName: userName,
        imageURL: profilePicUrl,
        bio: bio,
      })
      .then(function () {
        setDisplay(!display);
        setDisplayMessage("Updated Successfully");
        route.push("/");
      })
      .catch(function (error) {
        setDisplay(!display);
        setDisplayMessage(error.message);
      });
  };

  return (
    <div className="update__profile my-3 py-2 px-2">
      <Container>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="column"
          spacing={3}
        >
          <Grid item xs={4}>
            <Avatar />
          </Grid>

          <Grid
            item
            container
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={3}>
              <Typography variant="body1">User Name</Typography>
            </Grid>
            <Grid item xs>
              <input
                type="text"
                value={userName}
                className="update__profile__username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Grid item xs={3}>
              <Typography variant="body1">Profile Picture</Typography>
            </Grid>
            <Grid item xs>
              <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="update__profile__file__input"
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={3}>
              <Typography variant="body1">Add Bio</Typography>
            </Grid>
            <Grid item xs>
              <textarea
                rows={1}
                className="update__profile__textarea"
                onChange={(e) => setBio(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            spacing={3}
            alignItems="center"
          >
            <Grid item>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                onClick={handleSubmit}
              >
                SAVE
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => route.push("/profile/account")}
              >
                DISACRD
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </div>
  );
}

export default EditProfile;
