import { Grid, Icon } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../lib/firebase";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import GlobalContext from "../context/global";
import ProfileContext from "../context/profile";
function Thumbnails({ id }) {
  const [post, setPost] = useState();
  const { blogPost } = useContext(GlobalContext);
  const { profile } = useContext(ProfileContext);
  const getData = async () => {
    const getDoc = await db.collection("blogPosts").get();
    const res = getDoc.docs.map((docSnap) => {
      if (docSnap.data().uid === id)
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
  }, [blogPost]);

  return (
    <>
      {post
        ? post.map((item) => (
            <Grid item xs={6} sm={4} md={3}>
              <div className="thumbnail">
                <div className="thumbnail__icon">
                  <Icon>
                    <FavoriteBorderOutlinedIcon />
                  </Icon>
                </div>

                <img src={item.imageURL} className="thumbnail__image" />
              </div>
            </Grid>
          ))
        : ""}
    </>
  );
}

export default Thumbnails;
