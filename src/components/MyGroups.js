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
  const [joinGroupList, setJoinGroupList] = useState([]);
  const [accGroupReq, setAccGroupReq] = useState([]);
  const [accGroupBtn, setAccGroupBtn] = useState([]);
  const [show, setShow] = useState(false);
  const [showReq, setShowReq] = useState(false);
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
  let openallInfo = (gropItem) => {
    console.log(gropItem);
    setShow(true);
    const acceptGrReqRef = ref(db, "acceptGroupReq");
    onValue(acceptGrReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupId == gropItem.groupId) {
          arr.push(item.val());
        }
      });
      setAccGroupReq(arr);
    });
  };
  let showOff = () => {
    setShow(false);
    setShowReq(false);
  };
  let openAllReq = (gitem) => {
    console.log(gitem);
    setShowReq(true);
    const reqJoinGroupRef = ref(db, "reqJoinGroup");
    onValue(reqJoinGroupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().whoCreateGrpId &&
          item.val().groupId == gitem.groupId
        ) {
          arr.push({ ...item.val(), groupReqId: item.key });
        }
      });
      setJoinGroupList(arr);
    });
  };
  let acceptGrpReq = (item) => {
    console.log(item);
    set(push(ref(db, "acceptGroupReq")), {
      ...item,
    });
  };
  useEffect(() => {
    const acceptGrReqRef = ref(db, "acceptGroupReq");
    onValue(acceptGrReqRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {

          arr.push(item.val().groupReqId + item.val().whoCreateGrpId);

      });
      setAccGroupBtn(arr);
    });
  }, []);

  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll relative">
      <Headings heding="My Groups" />
      {(showReq || show) && (
        <Button
          Text={"Go Back"}
          className="absolute top-4 right-0"
          onClick={showOff}
        />
      )}
      {showReq ? (
        <>
          <Headings heding="Show Request" />
          {joinGroupList.map((item) => (
            <FriendsPattren
              names={`userName: ${item.userName}`}
              others={`GroupName: ${item.groupNames}  Admin: ${item.whoCreateGrpName}`}
              imgHere={item.userPhoto}
            >
              {accGroupBtn.includes(item.groupReqId + data.uid) ||
              accGroupBtn.includes(data.uid + item.groupReqId) ? (
                <Button Text={"Accepted"} />
              ) : (
                <Button Text={"Accept"} onClick={() => acceptGrpReq(item)} />
              )}
            </FriendsPattren>
          ))}
        </>
      ) : show ? (
        <>
          <Headings heding="All Members" />
          {accGroupReq.map((item) => (
            <FriendsPattren
              names={`GroupName: ${item.userName}`}
              others={`TagLine:  Admin: `}
              imgHere={item.userPhoto}
            >
              <Button Text={"Member"} />
            </FriendsPattren>
          ))}
        </>
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
            <Button Text={"Info"} onClick={() => openallInfo(item)} />
            <Button Text={"Request"} onClick={() => openAllReq(item)} />
            <Button Text={"Delete"} className="bg-red-500" />
          </FriendsPattren>
        ))
      )}
    </div>
  );
};

export default MyGroups;
