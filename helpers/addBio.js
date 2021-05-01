import React, { useState, useContext } from "react";
import ProfileContext from "../context/profile";
import DisplayMessage from "./snackbar";
import { Button, Grid } from "@material-ui/core";
import { db } from "../lib/firebase";
function AddBio({ id, close }) {
  const [bio, setBio] = useState();
  const [display, setDisplay] = useState(false);
  const [displayMessage, setDisplayMessage] = useState();
  const { profile, setProfile } = useContext(ProfileContext);
  const handleSubmit = () => {
    if (bio) {
      setProfile({
        ...profile,
        bio: bio,
      });
      db.collection("Profiles")
        .get()
        .then((docSnap) => {
          docSnap.docs.forEach((item) => {
            if (item.data().uid === id) {
              db.collection("Profiles").doc(item.id).update({
                bio: bio,
              });
            }
          });
        });
    } else {
      setDisplay(!display);
      setDisplayMessage("Update unsuccessful");
    }
    close(false);
  };

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
          <textarea
            rows={3}
            type="text"
            onChange={(e) => setBio(e.target.value)}
            className="add__bio__textarea"
          />
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          UPLOAD
        </Button>
      </Grid>
      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </div>
  );
}

export default AddBio;
