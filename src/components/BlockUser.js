import React from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";

const BlockUser = () => {
  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="Block User" />
      <FriendsPattren
        names={`Block Name`}
        others="Hi Guys, Wassup!"
        imgHere={"assets/img.png"}
      >
        <Button Text={"Unblock"} />
      </FriendsPattren>
    </div>
  );
};

export default BlockUser;
