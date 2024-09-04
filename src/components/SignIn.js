import React from "react";
import './login.css';

import { Button, Container, Typography } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/home");
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        <i>Entre com o Google</i>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => signInWithGoogle()}
      >
        ENTRAR
      </Button>
    </Container>
  );
};
function login() {
  return (
    <div className="container">
      <h2>AREA RESTRITA</h2>
      <input type="text" placeholder="Login" />
      <input type="password" placeholder="Senha" />
      <a href="#">Cadastro de Usuario</a>
      <button>Entrar</button>
    </div>
  );
}
export default SignIn;