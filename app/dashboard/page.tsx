"use client";
import { useRouter } from "next/navigation";
import { Button, Container } from "@mui/material";
import authService from "../lib/services/auth/";
import { ROOT_ROUTE } from "../lib/constants/routes";

export default function Dashboard() {
  const router = useRouter();

  const handleSignout = async () => {
    const user = await authService.signoutUser();

    if (user.isSignedOut) {
      router.push(ROOT_ROUTE);
    }
  };

  return (
    <main>
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>{"(null) < FIT "}</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Dashboard</h2>
          <Button onClick={handleSignout}>Sign out</Button>
        </div>
      </Container>
    </main>
  );
}
