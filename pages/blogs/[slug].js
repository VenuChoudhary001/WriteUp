import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";

import { Container, Grid, Typography } from "@material-ui/core";

function Slug() {
  const route = useRouter();
  const id = route.query;
  const [post, setPost] = useState();
  const getData = () => {
    db.collection("blogPosts")
      .get()
      .then((docSnap) => {
        docSnap.docs.forEach((item) => {
          if (item.data().uid === id.slug) {
            setPost({ ...item.data() });
          }
        });
      });
    // console.log(post);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!post) {
    return (
      <>
        <h6>Loading.....</h6>
      </>
    );
  }
  // const getDATE = new Date(post.publishedAt.toMillis());
  return (
    <>
      <div className="blog__post">
        <Container>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column"
          >
            <Grid item>
              <img src={post.imageURL} className="blog__post__image" />
            </Grid>
            <Grid item>
              <Typography variant="h6">{post.title}</Typography>
              <hr />
            </Grid>
            <Grid item>
              <Typography variant="h6">{post.content}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Author : {post.username}</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Slug;
