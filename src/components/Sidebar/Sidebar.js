import { Avatar, IconButton } from "@material-ui/core";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import SidebarChat from "../SidebarChat/SidebarChat";
import "./Sidebar.css";
import db, { auth } from "../../firebase";
import firebase from "firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setchats] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setchats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const addNewchat = () => {
    var chatName = prompt("Enter new chat name");
    if (chatName) {
      db.collection("chats").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        chatName: chatName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__avatar">
          <Avatar src={user.photo} onClick={() => auth.signOut()} />
        </div>

        <div className="sidebar__search">
          <SearchIcon />
          <input placeholder="search" />
        </div>
        <IconButton className="sidebar__createchat">
          <RateReviewOutlinedIcon onClick={addNewchat} />
        </IconButton>
      </div>
      <div className="sidebar__chat">
        {chats.map(({ id, data: { chatName } }) => {
          return <SidebarChat key={id} id={id} chatName={chatName} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
