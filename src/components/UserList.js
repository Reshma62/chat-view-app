import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import Modal from "./Modal";
const UserList = () => {
  const db = getDatabase();
  const [alluser, setAlluser] = useState([]);
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setAlluser(arr);
    });
  }, []);
  let handleFriendReqSend = (item) => {
    console.log(item);
    set(push(ref(db, "friendReqsend")), {
      senderName: data.displayName,
      senderId: data.uid,
      receiverName: item.username,
      receiverId: item.userId,
      profile_picture: data.photoURL,
    });
  };
  const [friendReqList, setFriendReqList] = useState([]);
  useEffect(() => {
    const friendReqSendRef = ref(db, "friendReqsend");
    onValue(friendReqSendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().receiverId);
      });
      setFriendReqList(arr);
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
            {friendReqList.includes(data.uid + item.userId) ||
            friendReqList.includes(item.userId + data.uid) ? (
              <Button
                Text={"Pending"}
                
              />
            ) : (
              <Button
                Text={"Add Friend"}
                onClick={() => handleFriendReqSend(item)}
              />
            )}
          </div>
        </FriendsPattren>
      ))}
    </div>
  );
};

export default UserList;
