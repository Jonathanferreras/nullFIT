"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import authService from "../services/auth";
import { DASHBOARD_ROUTE, ROOT_ROUTE } from "../constants/routes";

export default function Navbar() {
  const userAuth = useAuth();
  const router = useRouter();

  const handleSignout = async () => {
    const user = await authService.signoutUser();

    if (user.isSignedOut) {
      router.push(ROOT_ROUTE);
    }
  };

  const renderSignout = () => {
    if (userAuth.user) {
      return <Button onClick={handleSignout}>Sign Out</Button>;
    } else {
      return;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="warning" position="static">
        <Toolbar>
          <Typography
            onClick={() => router.push(DASHBOARD_ROUTE)}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {"nullFIT"}
          </Typography>
          {renderSignout()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
