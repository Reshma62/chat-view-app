import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const FriendReq = () => {
  const db = getDatabase();
  const [ friendReqList, setFriendReqList ] = useState( [] );
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  useEffect(() => {
    const friendReqSendRef = ref(db, "friendReqsend");
    onValue(friendReqSendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverId) {
          arr.push({ ...item.val(),friendReqId: item.key });
        }
      });
      setFriendReqList(arr);
    });
  }, []);

  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Friends List" />
      {friendReqList.map((item) => (
        <FriendsPattren
          names={item.senderName}
          others="Hi Guys, Wassup!"
          imgHere={item.profile_picture}
        >
          <div className="flex">
            <Button Text={"Accept"} />
            <Button Text={"Remove"} className="bg-red-500 text-sm ml-2" />
          </div>
        </FriendsPattren>
      ))}
    </div>
  );
};

export default FriendReq;
