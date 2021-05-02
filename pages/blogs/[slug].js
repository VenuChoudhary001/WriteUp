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
      .doc(id.slug)
      .get()
      .then((docSnap) => {
        // console.log(docSnap.data());
        setPost({ ...docSnap.data() });
      });

    // console.log(post);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!post) {
    return (
      <>
        <div className="mx-auto my-3 py-2 blog__slug__loading">
          <Typography variant="subtitle1">😁😉😆</Typography>
        </div>
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
