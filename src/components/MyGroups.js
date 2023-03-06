import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { useSelector } from "react-redux";
const MyGroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  const [groupList, setGroupList] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const createGroupRef = ref(db, "createGroup");
    onValue(createGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().whoCreateGrpId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);
  let openallInfo = () => {
    setShow(true);
  };
  let showOff = () => {
    setShow(false);
  };
  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll relative">
      <Headings heding="My Groups" />
      {show && (
        <Button
          Text={"Go Back"}
          className="absolute top-4 right-0"
          onClick={showOff}
        />
      )}
      {show ? (
        <FriendsPattren
          names={`GroupName: `}
          others={`TagLine:  Admin: `}
          imgHere={`item.whoCreateGrpPic`}
        >
          <Button Text={"Info"}/>
        </FriendsPattren>
      ) : groupList.length == 0 ? (
        <h2 className=" mt-8 bg-blue-500 text-xl text-white font-semibold font-OpenSans p-2">
          No Group Avalable
        </h2>
      ) : (
        groupList.map((item) => (
          <FriendsPattren
            names={`GroupName: ${item.groupNames}`}
            others={`TagLine: ${item.groupTags} Admin: ${item.whoCreateGrpName}`}
            imgHere={item.whoCreateGrpPic}
          >
            <Button Text={"Info"} onClick={openallInfo} />
            <Button Text={"Request"} />
            <Button Text={"Delete"} className="bg-red-500" />
          </FriendsPattren>
        ))
      )}
    </div>
  );
};

export default MyGroups;
