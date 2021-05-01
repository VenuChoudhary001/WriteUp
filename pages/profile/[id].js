import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { db } from "../../lib/firebase";
import { useRouter } from "next/router";
import Thumbnails from "../../components/thumbnails";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  rootBadge: {
    "&.MuiBadge-anchorOriginTopRightRectangle": {
      bottom: "0px",
      right: "2px",
    },
  },
}));
function SearchId() {
  const [name, setName] = useState();
  const [imageURL, setImageURL] = useState();
  const [bio, setBio] = useState();
  const route = useRouter();
  const classes = useStyles();
  const searchID = route.query;
  console.log(searchID);
  const getData = async () => {
    let res = db
      .collection("Profiles")
      .get()
      .then((docSnap) => {
        docSnap.docs.forEach((item) => {
          if (item.data().uid === searchID.id) {
            setName(item.data().user);
            setImageURL(item.data().imageURL);
            setBio(item.data().bio);
            console.log(item.data());
            return item;
          }
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
            <Avatar
              src={imageURL || "/pic"}
              alt={name}
              className={classes.large}
            />
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
              <Typography variant="h6">{name} </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Container>
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid item>
              {bio ? <Typography variant="caption">{bio}</Typography> : ""}
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
        <Thumbnails id={searchID.id} />

        <Grid item xs className="my-3 text-center">
          <Typography variant="h6">No more posts to show..</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchId;
