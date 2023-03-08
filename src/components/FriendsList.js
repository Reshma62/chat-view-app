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
import { useDispatch, useSelector } from "react-redux";
import { activeUsersInfo } from "../slices/activeUsers";
const FriendsList = () => {
  const [friendsList, setFriendsList] = useState([]);
  const db = getDatabase();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  let dispatch = useDispatch();

  /* const collectionRef = ref(db, "friends");
  collectionRef.on("child_added", (snapshot) => {
    // Get the new child ID
    const childId = snapshot.key;
    console.log(childId);
  }); */

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

  let sendMessage = (item) => {
    console.log(item);
    if (data.uid == item.receiverId) {
      dispatch(
        activeUsersInfo({
          name: item.senderName,
          id: item.senderId,
          status: "single",
          profilePhoto: item.profile_picture,
        })
      );
      localStorage.setItem(
        "activeChatUsers",
        JSON.stringify({
          name: item.senderName,
          id: item.senderId,
          status: "single",
          profilePhoto: item.profile_picture,
        })
      );
    } else {
      dispatch(
        activeUsersInfo({
          name: item.receiverName,
          id: item.receiverId,
          status: "single",
          profilePhoto: item.senderProfilePic,
        })
      );
      localStorage.setItem(
        "activeChatUsers",
        JSON.stringify({
          name: item.receiverName,
          id: item.receiverId,
          status: "single",
          profilePhoto: item.senderProfilePic,
        })
      );
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
            onClick={() => sendMessage(item)}
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
