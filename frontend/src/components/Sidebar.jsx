import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers,setAuthUser, setSelectedUser } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const Sidebar = () => {
  const [search, setSearch] = useState([]);
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
        navigate("/login");
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        dispatch(setMessages(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
    } catch (error) {
        console.log(error);
    }
}

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const searchedUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if(searchedUser) {
      dispatch(setOtherUsers([searchedUser]));
      setSearch([]);
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="w-2/5 md:min-w-[90px] lg:min-w-[320px] flex border-r border-slate-500 p-2 md:p-4 flex-col">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 input input-bordered rounded-3xl"
          type="text"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn bg-zinc-700 text-white rounded-3xl"
        >
          <BiSearchAlt2 className="w-6 md:h-6 outline-none" />
        </button>
      </form>
      <div className="divider md:px-3 divider-primary"></div>
      <OtherUsers />
      <div className="mt-2">
        <button
          onClick={logoutHandler}
          className="btn btn-sm btn-error text-white rounded-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
