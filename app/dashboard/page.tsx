"use client";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { WORKOUT_ROUTE } from "../lib/constants/routes";

export default function Dashboard() {
  const router = useRouter();

  return (
    <main>
      <Container maxWidth="sm">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Dashboard</h2>
          <Button onClick={() => router.push(WORKOUT_ROUTE)}>
            Create Workout
          </Button>
        </div>
      </Container>
    </main>
  );
}
