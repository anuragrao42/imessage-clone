import React from "react";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import "./Imessage.css";

function Imessage() {
  return (
    <div className="imessage">
      {/*Sidebar */}
      <Sidebar />
      {/*Chat */}
      <Chat />
    </div>
  );
}

export default Imessage;
