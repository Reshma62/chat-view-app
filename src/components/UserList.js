import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import Modal from "./Modal";
const UserList = () => {
  const db = getDatabase();
  const [alluser, setAlluser] = useState([]);
  let data = useSelector( ( state ) => state.alluserLoginInfo.userInfo );

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push(item.val());
        }
      });
      setAlluser(arr);
    });
  }, []);

  return (
    <div className="mt-10 h-[472px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="User List" />
      {alluser.map((item) => (
        <FriendsPattren
          names={item.username}
          others={item.email}
          imgHere={item.profile_picture}
        >
          <div className="flex">
            <Button Text={"Add Friend"} />
          </div>
        </FriendsPattren>
      ))}
     
    </div>
  );
};

export default UserList;
