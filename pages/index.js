import React, { useState, useContext, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import Link from "next/link";
import Posts from "../components/posts";
import { Typography } from "@material-ui/core";
import ProfileContext from "../context/profile";
import GlobalContext from "../context/global";
function Index({ blogs }) {
  // console.log("this is data", blogs);
  const { setProfile, profile } = useContext(ProfileContext);
  if (blogs.length == 0) {
    return (
      <div className="loading my-5 py-4 text-center">
        <Typography variant="subtitle1">
          Oops..Somethings went wrong..
        </Typography>
        <Link href="/">
          <Typography variant="body1" style={{ cursor: "pointer" }}>
            Refresh
          </Typography>
        </Link>
      </div>
    );
  }

  useEffect(() => {
    if (!auth.currentUser) {
      setProfile();
    }
  }, []);
  // useEffect(()=>{

  // },[blogs.length])
  return (
    <>
      {blogs.map((item) => {
        console.log(item.uid);
        return (
          <Posts
            key={item.id}
            user={item.username}
            content={item.content}
            imageURL={item.imageURL}
            title={item.title}
            publishedAt={item.publishedAt}
            id={item.uid}
            postID={item.id}
          />
        );
      })}
    </>
  );
}

export default Index;

export async function getServerSideProps() {
  const docRef = await db
    .collection("blogPosts")
    .orderBy("publishedAt", "desc")
    .get();

  const res = docRef.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      publishedAt: docSnap.data().publishedAt.toMillis(),
      id: docSnap.id,
    };
  });
  // console.log(res);
  return {
    props: { blogs: res },
  };
}
/*
->home page
->profile page
->search page for mobile only

*home page->
  ->posts

*Context
 -->Profile Context
   -->Shares details about user
   -->User update
 
 -->Global Context
   -->Contains all blog posts 
   -->Create blogs




*profile page->
  ->own profile
  ->avatar
  ->own posts
   
  Create a collection on signUp and store the profile pic and other data
  -->userID:{
    id:""
    userName:""
    email:""
    imageURL:""
    posts :{
      {id:"",image_url:"",title:"",content:"",author:"",publishedAt:""}
    }
  }



  **TBD
  -->user profile pic uplaod
  -->search functionality
  -->individual post page
  -->Like comment


  ****Need to create a collection of users in databse
*/
