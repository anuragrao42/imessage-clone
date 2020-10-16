import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Message.css";

const Message = forwardRef(
  ({ id, content: { timestamp, photo, text, email } }, ref) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${email === user.email ? `sender` : null} `}
      >
        <Avatar src={photo} className="message__photo" />
        <p>{text} </p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()} </small>
      </div>
    );
  }
);

export default Message;
