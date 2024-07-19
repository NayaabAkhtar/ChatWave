import React, { useEffect, useRef } from "react";
import {useSelector} from 'react-redux'
import { extractTime } from "../utils/extractTime";

const Message = ({message}) => {
  const {authUser,selectedUser}=useSelector(store=>store.user);
  const formattedTime = extractTime(message.createdAt);
   
  //useref is used whenever user sends the message, the scrollbar automatically comes to an end
  const scroll=useRef();

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"});
},[message]);

  return (
    <div ref={scroll} className={`chat ${authUser?._id===message?.senderId ? 'chat-end':'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="chat bubble component"
            src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">{formattedTime}</time>
      </div>
      <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : 'bg-green-400 text-black'} `}>{message?.message}</div>
    </div>
  );
};

export default Message;
