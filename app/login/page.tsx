"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormGroup, TextField } from "@mui/material";
import authService from "../lib/services/auth/";
import { useError } from "../lib/providers/ErrorProvider";
import { DASHBOARD_ROUTE } from "../lib/constants/routes";

export default function Login() {
  const initialFormState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialFormState);
  const router = useRouter();
  const { handleError } = useError();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    const { email, password } = user;
    const response = await authService.loginUser({
      email,
      password,
    });

    if (response.error) {
      handleError(response.error);
    } else {
      router.push(DASHBOARD_ROUTE);
    }
  };

  return (
    <>
      <FormGroup onChange={handleOnChange}>
        <TextField
          required
          label="Email"
          placeholder="Email"
          value={user.email}
          name="email"
        />
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="*****"
          value={user.password}
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={user.email === "" || user.password === ""}
          onClick={handleOnSubmit}
        >
          Login
        </Button>
      </FormGroup>
      <a href="/">Back</a>
    </>
  );
}
