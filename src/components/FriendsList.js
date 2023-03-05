import React, { useEffect, useState } from "react";
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
const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);
  const db = getDatabase();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().senderId ||
          data.uid == item.val().receiverId
        ) {
          arr.push({ ...item.val(), friendId: item.key });
        }
      });
      setFriendsList(arr);
    });
  }, []);
  let handleBlock = (item) => {
    console.log(item);
    if (data.uid == item.senderId) {
      set(push(ref(db, "block")), {
        whoBlockId: item.senderId,
        whoBlockName: item.senderName,
        whoBlockPic: item.senderProfilePic,
        blockId: item.receiverId,
        blockName: item.receiverName,
        blockPic: item.profile_picture,
      }).then(() => {
        remove(ref(db, "friends/" + item.friendId));
      });
    } else {
      set(push(ref(db, "block")), {
        whoBlockId: item.receiverId,
        whoBlockName: item.receiverName,
        whoBlockPic: item.profile_picture,
        blockId: item.senderId,
        blockName: item.senderName,
        blockPic: item.senderProfilePic,
      }).then(() => {
        remove(ref(db, "friends/" + item.friendId));
      });
    }
  };
  return (
    <div className="mt-10 h-[472px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Friends" />
      {friendsList.length == 0 ? (
        <h2 className=" mt-8 bg-blue-500 text-xl text-white font-semibold font-OpenSans p-2">
          No friends Avalable
        </h2>
      ) : (
        friendsList.map((item) => (
          <FriendsPattren
            names={
              data.uid == item.senderId ? item.receiverName : item.senderName
            }
            others="Hi Guys, Wassup!"
            imgHere={
              data.uid == item.senderId
                ? item.senderProfilePic
                : item.profile_picture
            }
          >
            <div className="flex">
              <Button
                Text={"Block"}
                className="bg-red-500 text-sm ml-2"
                onClick={() => handleBlock(item)}
              />
            </div>
          </FriendsPattren>
        ))
      )}
      {}
    </div>
  );
};

export default FriendsList;
