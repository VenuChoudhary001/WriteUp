import {
  Avatar,
  Badge,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ProfileContext from "../../context/profile";
import { Edit } from "@material-ui/icons";
import NearMeIcon from "@material-ui/icons/NearMe";
import { auth, db } from "../../lib/firebase";
import Posts from "../../components/posts";
import Thumbnails from "../../components/thumbnails";
import Link from "next/link";
import UploadImage from "../../helpers/profile-pic";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import DisplayMessage from "../../helpers/snackbar";
import AddBio from "../../helpers/addBio";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  rootBadge: {
    // "& .MuiBadge-anchorOriginTopRightRectangle": {
    top: "12px",
    right: "5px",
  },
}));

function Profile() {
  const route = useRouter();
  const { profile, setProfile } = useContext(ProfileContext);
  const [display, setDisplay] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  if (!profile) {
    return (
      <>
        <Container>
          <div className="account__unlogged my-4 py-4 text-center">
            <Typography variant="subtitle1">
              Ooops....You are not logged In!
            </Typography>
            <Link href="/login">
              <Typography
                variant="body1"
                style={{ cursor: "pointer", textDecorationLine: "underline" }}
              >
                Log In
              </Typography>
            </Link>
            <Link href="/signup">
              <Typography
                variant="body1"
                style={{ cursor: "pointer", textDecorationLine: "underline" }}
              >
                Sign Up
              </Typography>
            </Link>
          </div>
        </Container>
      </>
    );
  }

  const { user, uid, email } = profile;
  const [imageUpload, setImageUpload] = useState(false);
  const [updateBio, setUpdateBio] = useState(false);
  const classes = useStyles();
  /*
  const [post, setPost] = useState();
  const getData = async () => {
    const getDoc = await db.collection("blogPosts").get();
    const res = getDoc.docs.map((docSnap) => {
      if (docSnap.data().uid === profile.uid)
        return {
          ...docSnap.data(),
        };
      else {
        return {};
      }
    });
    setPost(res);
    console.log(post);
  };
  useEffect(() => {
    getData();
  }, []);*/
  // console.log(profile);

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        setDisplay(!display);
        setDisplayMessage("Successfully Logged Out");
        // console.log("logged out");
      })
      .catch((err) => {
        setDisplay(!display);
        setDisplayMessage(error.message);
      });
    route.push("/");
  };
  return (
    <>
      <Container className="mt-3 ">
        <Grid
          item
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={2}
          className="my-4"
        >
          <Grid item>
            <Badge
              badgeContent={<CameraAltIcon />}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              classes={{ anchorOriginTopRightRectangle: classes.rootBadge }}
              onClick={() => setImageUpload(!imageUpload)}
            >
              <Avatar
                src={profile.imageURL || "/pic"}
                alt={user}
                className={classes.large}
              />
            </Badge>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column"
            spacing={0}
            xs={7}
          >
            <Grid item>
              <Typography variant="h6">{user} </Typography>
              <Typography variant="caption" style={{ lineHeight: "5px" }}>
                {email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Container>
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid item>
              {profile.bio ? (
                <Typography variant="caption">{profile.bio}</Typography>
              ) : (
                <Typography variant="caption">Add Bio</Typography>
              )}
            </Grid>
            <Grid item>
              <Icon>
                <Edit onClick={() => setUpdateBio(!updateBio)} />
              </Icon>
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handleLogOut}
              >
                LOG OUT
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <hr />
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className="text-center"
        spacing={1}
      >
        <Thumbnails id={profile.uid} />

        <Grid item xs className="my-3 text-center">
          <Typography variant="h6">No more posts to show..</Typography>
          <Typography variant="button">Create Post</Typography>
        </Grid>
      </Grid>
      <Dialog open={imageUpload} onClose={() => setImageUpload(!imageUpload)}>
        <DialogContent>
          <UploadImage
            bucket={"profile_pic"}
            close={setImageUpload}
            id={profile.uid}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={updateBio} onClose={() => setUpdateBio(!updateBio)}>
        <DialogContent>
          <AddBio id={profile.uid} close={setUpdateBio} />
        </DialogContent>
      </Dialog>
      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </>
  );
}

export default Profile;
