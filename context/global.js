import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
const GlobalContext = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [blogPost, setBlogPost] = useState();
  const [showCreatePost, setShowCreatePost] = useState(false);

  /*useEffect(() => {
    if (blogPost) {
      db.collection("blogPosts").add({
        title: blogPost.title,
        content: blogPost.content,
        imageURL: blogPost.imageURL,
        user: blogPost.username,
        uid: blogPost.uid,
        publishedAt: blogPost.publishedAt,
      });
      console.log(blogPost);
    }
  }, [blogPost]);*/

  return (
    <GlobalContext.Provider
      value={{ blogPost, setBlogPost, showCreatePost, setShowCreatePost }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
