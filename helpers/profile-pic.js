import React, { useState, useContext } from "react";
import { storage, auth, db } from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import DisplayMessage from "./snackbar";
import ProfileContext from "../context/profile";
import { Button } from "@material-ui/core";
function UploadImage({ bucket, close, id }) {
  const { profile, setProfile } = useContext(ProfileContext);

  const [displayMessage, setDisplayMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const handleSubmit = () => {
    let storageRef = storage.ref();
    let uploadTask = storageRef.child(`${bucket}/${uuidv4()}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setDisplay(!display);
        setDisplayMessage(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageURL(downloadURL);
          // console.log(imageURL);
          setProfile({
            ...profile,

            imageURL: downloadURL,
          });
          // console.log("Doc id", id);
          db.collection("Profiles")
            .get()
            .then((docSnap) => {
              docSnap.docs.forEach((item) => {
                if (item.data().uid === id) {
                  db.collection("Profiles").doc(item.id).update({
                    imageURL: downloadURL,
                  });
                }
              });
            });
        });
      }
    );

    close(false);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        UPLOAD
      </Button>
      <DisplayMessage
        open={display}
        close={setDisplay}
        message={displayMessage}
      />
    </div>
  );
}

export default UploadImage;
