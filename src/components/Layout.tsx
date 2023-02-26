import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        {/* Renders the route that's currently active */}
        <Outlet />
      </Container>
    </>
  );
};
