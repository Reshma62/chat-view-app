import React, { useState, useEffect } from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";
import InputBox from "./InputBox";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { useSelector } from "react-redux";
const GroupList = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  const [show, setShow] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [sendGrReq, setSendGrReq] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const [groupNameErr, setGroupNameErr] = useState("");
  const [groupTagErr, setGroupTagErr] = useState("");

  let openCreateGrp = () => {
    setShow(true);
  };
  let showOff = () => {
    setShow(false);
    setGroupNameErr("");
    setGroupTagErr("");
  };
  let handlegrpName = (e) => {
    setGroupName(e.target.value);
    setGroupNameErr("");
  };
  let handlegrpTag = (e) => {
    setGroupTag(e.target.value);
    setGroupTagErr("");
  };
  let createGroup = () => {
    if (!groupName) {
      setGroupNameErr("Group Name is Requried");
    }
    if (!groupTag) {
      setGroupTagErr("Group Tag is Requried");
    }
    set(push(ref(db, "createGroup")), {
      groupNames: groupName,
      groupTags: groupTag,
      whoCreateGrpId: data.uid,
      whoCreateGrpName: data.displayName,
      whoCreateGrpPic: data.photoURL,
    });
    setGroupName("");
    setGroupTag("");
    setShow(false);
  };
  useEffect(() => {
    const createGroupRef = ref(db, "createGroup");
    onValue(createGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.val().whoCreateGrpId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);
  let joinGroup = (item) => {
    // console.log( item );
    set(push(ref(db, "reqJoinGroup")), {
      ...item,
      userName: data.displayName,
      userId: data.uid,
      userPhoto: data.photoURL,
    });
  };
  useEffect(() => {
    const reqGroupRef = ref(db, "reqJoinGroup");
    onValue(reqGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId + item.val().userId);
      });
      setSendGrReq(arr);
    });
  }, []);
  const [accGroupReq, setAccGroupReq] = useState([]);
  useEffect(() => {
    const acceptGrReqRef = ref(db, "acceptGroupReq");
    onValue(acceptGrReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("item", item.val());
        arr.push(item.val().groupId + item.val().userId);
      });
      setAccGroupReq(arr);
    });
  }, []);

  return (
    <div className="mt-10 h-[400px] shadow-xl p-6 rounded-2xl bg-white relative overflow-y-scroll">
      <Headings heding="Groups List" onClick={openCreateGrp} />
      {show && (
        <Button
          Text={"Go Back"}
          className="absolute top-4 right-0"
          onClick={showOff}
        />
      )}

      {show ? (
        <>
          <InputBox type={"text"} label="Group Name" onChange={handlegrpName} />
          {groupNameErr && (
            <p className="bg-red-500 px-3 rounded-md text-white -mt-10 mb-10 py-2">
              {groupNameErr}
            </p>
          )}
          <InputBox
            type={"text"}
            label="Group Tagline"
            onChange={handlegrpTag}
          />
          {groupTagErr && (
            <p className="bg-red-500 px-3 rounded-md text-white -mt-10 mb-10 py-2">
              {groupTagErr}
            </p>
          )}
          <Button
            Text={"Create Group"}
            className="w-full py-4 mt-0"
            onClick={createGroup}
          />
        </>
      ) : groupList.length == 0 ? (
        <h2 className=" mt-8 bg-blue-500 text-xl text-white font-semibold font-OpenSans p-2">
          No Group Avalable
        </h2>
      ) : (
        groupList.map((item) => (
          <FriendsPattren
            names={`GroupName: ${item.groupNames}`}
            others={`TagLine: ${item.groupTags} <p></p> Admin: ${item.whoCreateGrpName}`}
            imgHere={item.whoCreateGrpPic}
          >
            {accGroupReq.includes(data.uid + item.groupId) ||
            accGroupReq.includes(item.groupId + data.uid) ? (
              <Button Text={"Member"} />
            ) : sendGrReq.includes(data.uid + item.groupId) ||
              sendGrReq.includes(item.groupId + data.uid) ? (
              <Button Text={"Pending"} />
            ) : (
              <Button Text={"Join"} onClick={() => joinGroup(item)} />
            )}
            {}
          </FriendsPattren>
        ))
      )}
    </div>
  );
};

export default GroupList;
