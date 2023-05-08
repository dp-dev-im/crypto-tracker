import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";

function Root() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>title helmet</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"
            rel="stylesheet"
          ></link>
        </Helmet>
        
        <h1>Root</h1>
        <Outlet />
      </HelmetProvider>
    </>
  );
}

export default Root;
