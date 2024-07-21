import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    username: [],
    password: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://chatwave-o7y7.onrender.com/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: [],
      password: []
    })
  }

  return (
    <div className="min-w-96 mx-auto">
    <div className='w-full p-6 rounded-3xl shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-gray-100'>
      <h1 className='text-3xl font-bold text-center text-white'>Login</h1>
      <form onSubmit={onSubmitHandler} action="">

        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-white'>Username</span>
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className='w-full rounded-3xl input input-bordered h-10 text-gray-400'
            type="text"
            placeholder='Username' />
        </div>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text text-white'>Password</span>
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='w-full rounded-3xl input input-bordered h-10 text-gray-400'
            type="password"
            placeholder='Password' />
        </div>
        <p className='text-center my-2 text-white'>Don't have an account? <Link to="/signup" className='text-cyan-400 font-bold'> Signup </Link></p>
        <div>
          <button type="submit" className='btn btn-info btn-block btn-sm mt-2 border border-slate-700 font-bold'>Login</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login