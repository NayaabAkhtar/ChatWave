import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import io from 'socket.io-client'
import {setSocket} from './redux/socketSlice'
import {setOnlineUsers} from './redux/userSlice'

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io(`http://localhost:8080`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);


  return (
    
    <div className="p-4 h-screen flex items-center justify-center">
      <span className='absolute top-1 font-custom left-3 text-xl md:text-2xl lg:text-2xl font-extrabold bg-gradient-to-r from-sky-500 via-purple-500 to-red-500 bg-clip-text text-transparent'>ChatWave</span>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
