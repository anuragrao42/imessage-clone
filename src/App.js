import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import { selectUser, login, logout } from "./features/userSlice";
import Imessage from "./Imessage";
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
        //logged in
      } else {
        dispatch(logout());
        //loggedout
      }
    });
  }, []);
  const user = useSelector(selectUser);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
