import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        {/* Renders the route that's currently active */}
        <Outlet />
      </Container>
    </>
  );
};
