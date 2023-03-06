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
  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log(item.val());
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriendsList(arr);
    });
  }, []);
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoBlockId + item.val().blockId);
      });
      setBlockList(arr);
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
            { blockList.includes(data.uid + item.userId)||
             blockList.includes(item.userId + data.uid)? (
              <Button Text={"Block"} className="bg-red-500"/>
            ) : friendsList.includes(item.userId + data.uid) ||
              friendsList.includes(data.uid + item.userId) ? (
              <Button Text={"Friend"} />
            ) : friendReqList.includes(data.uid + item.userId) ||
              friendReqList.includes(item.userId + data.uid) ? (
              <Button Text={"Pending"} />
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
