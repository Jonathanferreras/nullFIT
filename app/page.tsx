import Container from "@mui/material/Container";

export default function Home() {
  return (
    <main>
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>{"(null) < FIT "}</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      </Container>
    </main>
  );
}
