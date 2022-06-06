/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/redux/useActions";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { useAuth } from "../../hooks/auth";

export const SignIn: React.FC = (): any => {
  const form = useTypedSelector((s) => s.form);

  const app = useTypedSelector((s) => s.app);

  const { setEmail, setPassword } = useActions();

  const auth = useAuth();

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    auth("login");
  };

  if (app.user && app.token)
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        Loading...
      </div>
    );

  return (
    <div
      className="bg-light w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Paper elevation={6} className="w-25 py-5 px-4">
        <h2 className="py-3 text-muted text-center">Sign in</h2>
        <form className="d-flex flex-column" onSubmit={handleLogin}>
          <TextField
            id="standard-basic"
            type="email"
            value={form.email}
            error={form.error.email}
            onChange={(e: any) => setEmail(e.target.value)}
            label="E-mail"
            variant="standard"
          />
          <TextField
            id="standard-basic2"
            type="password"
            error={form.error.password}
            value={form.password}
            onChange={(e: any) => setPassword(e.target.value)}
            label="Password"
            className="mt-3"
            variant="standard"
          />
          <Button
            variant="contained"
            type="submit"
            className="mt-4 bg-dark"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link
            to="/register"
            className="text-end text-muted d-flex justify-content-end w-100 pt-1"
            style={{ fontSize: "0.9rem", fontWeight: 200 }}
          >
            Don't have an account yet?
          </Link>
        </form>
      </Paper>
    </div>
  );
};
