import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../theme";
import { GlobalStyle } from "../GlobalStyle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  border: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.textColor};
  button {
    margin: 15px 15px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
`;

function Home() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleMode = () => setIsDark((current) => !current);
  return (
    <>
      <h1>Home</h1>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Container>
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          <Link to={"/coins"}>
            <button>Coins</button>
          </Link>
          <button onClick={toggleMode}>
            {isDark ? "Dark Mode" : "Light Mode"}
          </button>
        </Container>
      </ThemeProvider>
      <Outlet />
    </>
  );
}

export default Home;
