import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "../../features/chatSlice";
import db from "../../firebase";
import "./SidebarChat.css";
import * as timeago from "timeago.js";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setchatInfo] = useState([]);
  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setchatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);
  return (
    <div
      onClick={() => dispatch(setChat({ chatId: id, chatName: chatName }))}
      className="sidebarchat"
    >
      <div className="sidebarchat__avatar">
        <Avatar />
      </div>

      <div className="sidebarchat__details">
        <h2>{chatName} </h2>
        <p>{chatInfo[0]?.text} </p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
