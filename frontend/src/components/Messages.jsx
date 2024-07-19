import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  //custom hook
    useGetMessages();
    useGetRealTimeMessage();
    
    const { messages } = useSelector(store => store.message);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
               messages && Array.isArray(messages) && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        </div>


    )
}

export default Messages