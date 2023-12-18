import React, { ReactNode } from "react";
import Head from "next/head";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gestiones Bancarias</title>
      </Head>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div">
            Gestiones Bancarias
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="xl"
        sx={{ backgroundColor: "#E3F2FD", minHeight: "100vh", paddingY: 2 }}
      >
        {children}
      </Container>
    </>
  );
};
