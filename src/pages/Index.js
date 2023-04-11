import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlockUser from "../components/BlockUser";
import Flex from "../components/Flex";
import FriendReq from "../components/FriendReq";
import FriendsList from "../components/FriendsList";
import GroupList from "../components/GroupList";
import MyGroups from "../components/MyGroups";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../slices/userSlices";
const Home = () => {
  const auth = getAuth();
  let [verify, setVerify] = useState(false);
  let dispatch = useDispatch();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  // console.log(data);
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
    /* if (usersin) {
      setVerify(true);
    } */
  }, [] );

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

   }, []);


  return (
    <>
      {user && !user.emailVerified && (
        <div className="flex w-full h-screen justify-center items-center bg-primary">
          <h3 className="text-5xl bg-white text-primary text-center p-7  font-pop font-bold">
            please verify your mail
          </h3>
        </div>
      )}
      {user && (
        <div className="p-6">
          <Flex className={`gap-x-5 justify-between`}>
            <div className="w-[10%]">
              <Sidebar active="home" />
            </div>
            <div className="w-[33%]">
              <Search />
              <GroupList />
              <FriendReq />
            </div>
            <div className="w-[28%]">
              <FriendsList />
              <MyGroups />
            </div>
            <div className="w-[28%]">
              <UserList />
              <BlockUser />
            </div>
          </Flex>
        </div>
      ) }
    </>
  );
};

export default Home;
