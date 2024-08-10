import React,{useEffect} from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='flex h-[570px] md:h-[580px] rounded-lg overflow-hidden bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage