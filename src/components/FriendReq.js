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
const FriendReq = () => {
  const db = getDatabase();
  const [friendReqList, setFriendReqList] = useState([]);
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  let profileData = useSelector((state) => state.alluserLoginInfo.getPhoto);
  console.log(profileData);
  useEffect(() => {
    const friendReqSendRef = ref(db, "friendReqsend");
    onValue(friendReqSendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverId) {
          arr.push({ ...item.val(), friendReqId: item.key });
        }
      });
      setFriendReqList(arr);
    });
  }, []);
  let handleAcceptReq = (item) => {
    console.log(item);
    set(push(ref(db, "friends")), {
      ...item,
      senderProfilePic: profileData,
    }).then(() => {
      remove(ref(db, "friendReqsend/" + item.friendReqId));
    });
  };
  let cancelRequest = (item) => {
    remove(ref(db, "friendReqsend/" + item.friendReqId));
  };

  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Friends List" />

      {friendReqList.length == 0 ? (
        <h2 className=" mt-8 bg-blue-500 text-xl text-white font-semibold font-OpenSans p-2">
          No friend Request Avalable
        </h2>
      ) : (
        friendReqList.map((item) => (
          <FriendsPattren
            names={item.senderName}
            others="Hi Guys, Wassup!"
            imgHere={item.profile_picture}
          >
            <div className="flex">
              <Button Text={"Accept"} onClick={() => handleAcceptReq(item)} />
              <Button Text={"Remove"} className="bg-red-500 text-sm ml-2" onClick={()=>cancelRequest(item)}/>
            </div>
          </FriendsPattren>
        ))
      )}
    </div>
  );
};

export default FriendReq;
