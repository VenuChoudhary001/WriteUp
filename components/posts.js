import { Avatar, Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import ProfileContext from "../context/profile";
import { useRouter } from "next/router";
import { db, serverTime } from "../lib/firebase";
import Link from "next/link";
import DisplayMessage from "../helpers/snackbar";
function Posts({ id, imageURL, content, title, publishedAt, user, postID }) {
  // console.log("This is the id of the user who commented", id);
  const { profile } = useContext(ProfileContext);
  const getDATE = new Date(publishedAt);
  const router = useRouter();
  const truncate = (postContent, size) => {
    return `${postContent.slice(0, size)}...`;
  };

  const [myComment, setMyComment] = useState();
  const [allComment, setAllComment] = useState();
  const [updateComment, setUpdateComment] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const displayAllComment = async () => {
    const data = await db
      .collection("blogPosts")
      .doc(postID)
      .collection("comments")
      .orderBy("publishedAt", "desc")
      .get();
    if (data) {
      const getAllComments = data.docs.map((item) => item.data());
      setAllComment(getAllComments);
      // console.log("this is all comments for ", title, getAllComments);
    }
  };

  const postComment = () => {
    if (profile) {
      db.collection("blogPosts").doc(postID).collection("comments").add({
        user: profile.user,
        comment: myComment,
        publishedAt: serverTime(),
        profileURL: profile.uid,
      });
      setUpdateComment(!updateComment);
    } else {
      setDisplay(!display);
      setDisplayMessage("Please Log In");
    }
  };

  //Updating Avatar of each posts && link to profile
  const [profileURL, setProfileURL] = useState();
  const [avatar, setAvatar] = useState();
  let res = db
    .collection("Profiles")
    .get()
    .then((docSnap) => {
      return docSnap.docs.forEach((users) => {
        if (users.data().uid === id) {
          setAvatar(users.data().imageURL);
          setProfileURL(users.data().uid);
          return users.data().imageURL;
        }
      });
    });

  useEffect(() => {
    displayAllComment();
  }, [updateComment]);

  return (
    <div className="post my-2 py-2 ">
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="column"
        spacing={2}
      >
        <Grid item container justify="flex-start" alignItems="center">
          <Grid item className="mx-2">
            <Link href={`/profile/${profileURL}`}>
              <Avatar src={avatar} alt={user} />
            </Link>
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" style={{ lineHeight: "16px" }}>
              <Link href={`/profile/${profileURL}`}>{user}</Link>
              <br />
              <Typography variant="caption">
                {getDATE.toDateString()}
              </Typography>
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <img src={imageURL} className="post__image" />
        </Grid>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
          {content.length > 75 ? (
            <main>
              <Typography variant="body1">{truncate(content, 75)}</Typography>
              <Link href={`/blogs/${postID}`}>
                <button className="post__read__more">Read More</button>
              </Link>
            </main>
          ) : (
            <Typography variant="body1">{content}</Typography>
          )}
        </Grid>
        <Grid
          item
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="column"
        >
          {allComment
            ? allComment.map((item) => (
                <Grid item key={new Date().getSeconds().toString()}>
                  <Link href={`/profile/${item.profileURL}`}>
                    <span className="post__comment__user">{item.user}</span>
                  </Link>
                  <span className="post__comment px-1">{item.comment}</span>

                  <Typography variant="caption">
                    {item.publishedAt
                      ? new Date(item.publishedAt.toMillis()).toTimeString()
                      : "a moment ago"}
                  </Typography>
                </Grid>
              ))
            : null}
        </Grid>
        <hr />
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          className="mb-2 px-2"
          spacing={1}
        >
          <Grid item xs>
            <input
              type="text"
              className="post__comment__input"
              placeholder="comment"
              onChange={(e) => setMyComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              size="small"
              onClick={postComment}
            >
              POST
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </div>
  );
}

export default Posts;
