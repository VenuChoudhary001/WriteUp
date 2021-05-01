import React from "react";
import Head from "next/head";
import Theme from "../theme/theme";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./header";
import { ProfileContextProvider } from "../context/profile";
import { GlobalContextProvider } from "../context/global";

import Footer from "./footer";
function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <ThemeProvider theme={Theme}>
        <GlobalContextProvider>
          <ProfileContextProvider>
            <div className="main__body" style={{ minHeight: "730px" }}>
              <Header />
              {children}
            </div>
            <Footer />
          </ProfileContextProvider>
        </GlobalContextProvider>
      </ThemeProvider>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
        crossorigin="anonymous"
      ></script>
    </>
  );
}

export default Layout;
