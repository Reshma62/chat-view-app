import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeUsersInfo } from "../slices/activeUsers";
const AllGroupList = () => {
  const db = getDatabase();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const createGroupRef = ref(db, "createGroup");
    onValue(createGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupId: item.key });
      });
      setGroupList(arr);
    });
  }, []);
  let handleGroupMess = (item) => {
    console.log(item);

    dispatch(
      activeUsersInfo({
        name: item.groupNames,
        id: item.groupId,
        adminId:item.whoCreateGrpId,
        status: "group",
        profilePhoto: item.whoCreateGrpPic,
      })
    );
    localStorage.setItem("activeChatUsers", JSON.stringify({
        name: item.groupNames,
        id: item.groupId,
        adminId:item.whoCreateGrpId,
        status: "group",
        profilePhoto: item.whoCreateGrpPic,
      }));

  };
  return (
    <div className="mt-10 h-[400px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="All Groups List" />
      {groupList.map((item) => (
        <FriendsPattren
          onClick={() => handleGroupMess(item)}
          names={`GroupName: ${item.groupNames}`}
          others={`TagLine: ${item.groupTags} <p></p> Admin: ${item.whoCreateGrpName}`}
          imgHere={item.whoCreateGrpPic}
        >
          <Button Text={"Message"} />
        </FriendsPattren>
      ))}
    </div>
  );
};

export default AllGroupList;
