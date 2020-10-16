import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import React from "react";
import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          //
          alt="logo"
        />
        <h1>iMessage</h1>
      </div>

      <Button onClick={signIn}>Sign-in</Button>
    </div>
  );
}

export default Login;
