import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Fab,
  Toolbar,
  Typography,
  Avatar,
} from "@material-ui/core";
import React, { useContext } from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/styles";
import { SearchOutlined, EditIcon } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileContext from "../context/profile";
import GlobalContext from "../context/global";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiIconButton-label": {
      color: "grey",
      fontSize: "40",
      "&:hover": {
        color: "black",
      },
    },
  },
}));
function Header() {
  const { profile } = useContext(ProfileContext);
  const { showCreatePost, setShowCreatePost } = useContext(GlobalContext);
  const classes = useStyles();
  const route = useRouter();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="subtitle1" className="header__logo">
            WriteUp
          </Typography>
          <Grid
            className={classes.root}
            container
            justify="flex-end"
            alignItems="flex-end"
          >
            {/* <Grid item>
              <IconButton>
                <SearchOutlined style={{ fontSize: "30" }} />
              </IconButton>
            </Grid> */}
            <Grid item>
              <Link href="/">
                <IconButton>
                  <HomeOutlinedIcon style={{ fontSize: "30" }} />
                </IconButton>
              </Link>
            </Grid>

            <Grid item>
              <Link href={profile ? `/profile/account` : "/login"}>
                <IconButton>
                  {profile ? (
                    <Avatar src={profile.imageURL} alt={profile.user} />
                  ) : (
                    <AccountCircleIcon style={{ fontSize: "30" }} />
                  )}
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {profile ? (
        <div
          className="btn_fab"
          style={{
            visibility:
              route.pathname === "/blogs/create-posts" ? "hidden" : "visible",
          }}
        >
          <Link href="/blogs/create-posts">
            <Fab color="secondary">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
