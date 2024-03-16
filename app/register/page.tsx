"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormGroup, TextField } from "@mui/material";
import { registerUser } from "../lib/services/auth/client";
import { useError } from "../providers/error";
import {
  validateAccessKey,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../lib/utils/validation";

export default function Register() {
  const initialFormState = {
    email: "",
    password: "",
    confirmPassword: "",
    accessKey: "",
  };
  const [user, setUser] = useState(initialFormState);
  const [validationErrors, setValidationErrors] = useState(initialFormState);
  const router = useRouter();
  const { handleError } = useError();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    const { email, password, accessKey } = user;
    const response = await registerUser({ email, password, accessKey });

    if (response.error) {
      handleError(response.error);
    } else {
      router.push("/dashboard");
    }
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = validateEmail(value) ? "" : "Invalid email address";
        break;
      case "password":
        errorMessage = validatePassword(value)
          ? ""
          : "Password must contain at least one number, one capital letter, and one special character";
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value, user.password)
          ? ""
          : "Passwords do not match";
        break;
      case "accessKey":
        errorMessage = validateAccessKey(value)
          ? ""
          : "Invalid access key format (xxxx-xxxx-xxxx)";
        break;
      default:
        break;
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    if (
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.confirmPassword &&
      !validationErrors.accessKey
    ) {
      validateForm();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateForm = () => {
    const isValidEmail = validateEmail(user.email);
    const isValidPassword = validatePassword(user.password);
    const isMatchingPassword = validateConfirmPassword(
      user.confirmPassword,
      user.password
    );
    const isValidAccessKey = validateAccessKey(user.accessKey);

    setIsFormValid(
      isValidEmail && isValidPassword && isMatchingPassword && isValidAccessKey
    );
  };

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      <FormGroup onChange={handleOnChange}>
        <TextField
          required
          label="Email"
          placeholder="Email"
          value={user.email}
          name="email"
          error={validationErrors.email !== ""}
          helperText={validationErrors.email}
        />
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="*****"
          value={user.password}
          name="password"
          error={validationErrors.password !== ""}
          helperText={validationErrors.password}
        />
        <TextField
          required
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="*****"
          value={user.confirmPassword}
          name="confirmPassword"
          error={validationErrors.confirmPassword !== ""}
          helperText={validationErrors.confirmPassword}
        />
        <TextField
          required
          label="Access Key"
          placeholder="xxxx-xxxx-xxxx"
          value={user.accessKey}
          name="accessKey"
          error={validationErrors.accessKey !== ""}
          helperText={validationErrors.accessKey}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isFormValid}
          onClick={handleOnSubmit}
        >
          Register
        </Button>
      </FormGroup>
    </>
  );
}
