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
const BlockUser = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          data.uid == item.val().whoBlockId ||
          data.uid == item.val().blockId
        ) {
          arr.push({ ...item.val(), blockListId: item.key });
        }
      });
      setBlockList(arr);
    });
  }, []);
  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Block User" />
      {blockList.length == 0 ? (
        <h2 className=" mt-8 bg-blue-500 text-xl text-white font-semibold font-OpenSans p-2">
          No Block Avalable
        </h2>
      ) : (
        blockList.map((item) => (
          <FriendsPattren
            names={
              item.whoBlockId == data.uid ? item.blockName : item.whoBlockName
            }
            others="Hi Guys, Wassup!"
            imgHere={
              item.whoBlockId == data.uid ?item.whoBlockPic  :item.blockPic
            }
          >
            {item.whoBlockId == data.uid && <Button Text={"Unblock"} />}
          </FriendsPattren>
        ))
      )}
    </div>
  );
};

export default BlockUser;
