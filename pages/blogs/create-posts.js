import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import GlobalContext from "../../context/global";
import ProfileContext from "../../context/profile";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { storage, serverTime, db } from "../../lib/firebase";
import Link from "next/link";
import DisplayMessage from "../../helpers/snackbar";
function CreatePosts() {
  const route = useRouter();
  const { profile } = useContext(ProfileContext);

  if (!profile) {
    return (
      <>
        <div className="text-center my-4 py-2">
          <Typography variant="subtitle1">
            Oops..Seems you haven't logged in !
          </Typography>
          <Link href="/login">
            <Typography variant="body1" style={{ cursor: "pointer" }}>
              Click here to Log In
            </Typography>
          </Link>
        </div>
      </>
    );
  }

  const { setBlogPost } = useContext(GlobalContext);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [image_url, setImage_URL] = useState();
  const [display, setDisplay] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const handleSubmit = () => {
    if (!title || !content || !image) {
      setDisplay(!display);
      setDisplayMessage("Fill in the details correctly");
    } else {
      let storageRef = storage.ref();
      let uploadTask = storageRef.child(`images/${uuidv4()}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            setDisplay(!display);
            setDisplayMessage("Posted Successfully");
          }
        },
        (error) => {
          setDisplay(!display);
          setDisplayMessage(error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImage_URL(downloadURL);
            setBlogPost({
              title: title,
              content: content,
              username: profile.user,
              uid: profile.uid,
              imageURL: downloadURL,
              publishedAt: serverTime(),
            });
            db.collection("blogPosts").add({
              title: title,
              content: content,
              username: profile.user,
              uid: profile.uid,
              imageURL: downloadURL,
              publishedAt: serverTime(),
            });
          });
        }
      );
      route.replace("/profile/account");
    }
  };

  return (
    <>
      <div className="create__post">
        <Container>
          <Grid
            container
            //   justify="flex-start"
            //   alignItems="flex-start"
            direction="column"
            spacing={2}
          >
            <Grid item></Grid>
            <Grid item xs={12}>
              <Typography variant="h6">TITLE</Typography>
            </Grid>

            <Grid item xs={12}>
              <input
                type="text"
                className="create__post__input"
                placeholder="title for your post"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption" style={{ color: "red" }}>
                **Max 500 characters{" "}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <textarea
                type="text"
                className="create__post__textarea"
                rows={10}
                placeholder="Your story "
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">Upload Image</Typography>
            </Grid>
            <Grid item>
              <input
                type="file"
                className="create__post__file__input"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleSubmit}
              >
                POST
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => route.replace("/")}
              >
                DISCARD
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </>
  );
}

export default CreatePosts;
