import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";

const OtherUsers = () => {
  //custom hook
  useGetOtherUsers();
  
  const {otherUsers} = useSelector(store=>store.user);
  if (!otherUsers) return; // early return to avoid ahead mapping error

  return (
    <div className='flex-1 overflow-auto'>
      {
               Array.isArray(otherUsers) && otherUsers?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
    </div>
  )
}

export default OtherUsers
