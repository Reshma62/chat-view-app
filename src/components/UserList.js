import React from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";

const UserList = () => {
  return (
    <div className="mt-10 h-[472px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="User List" />
      <FriendsPattren
        names={`User Name`}
        others="Hi Guys, Wassup!"
        imgHere={"assets/img.png"}
      >
        <div className="flex">
          <Button Text={"Add Friend"} />
        </div>
      </FriendsPattren>
    </div>
  );
};

export default UserList;
