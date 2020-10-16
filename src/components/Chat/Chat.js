import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChatname, selectChatid } from "../../features/chatSlice";
import db from "../../firebase";
import Message from "../Message/Message";
import firebase from "firebase";
import FlipMove from "react-flip-move";

import "./Chat.css";
import { selectUser } from "../../features/userSlice";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const sendMessage = (e) => {
    e.preventDefault();
    if (chatId) {
      db.collection("chats").doc(chatId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        text: message,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
    }
    setMessage("");
  };

  const chatName = useSelector(selectChatname);
  const chatId = useSelector(selectChatid);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h3>
          To:
          <span className="chat__name">
            {chatName ? chatName : <span>No Chat Room Selected! </span>}
          </span>
        </h3>

        <strong>Details</strong>
      </div>
      <div className="chat__body">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} content={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__footer">
        <form>
          <input
            placeholder="iMessage"
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send Message
          </button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}
export default Chat;
