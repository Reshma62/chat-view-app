import React from "react";
import Button from "./Button";
import FriendsPattren from "./FriendsPattren";
import Headings from "./Headings";

const MyGroups = () => {
  return (
    <div className="mt-10 h-[425px] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Headings heding="My Groups" />
      <FriendsPattren
        names={`Friends Name`}
        others="Hi Guys, Wassup!"
        imgHere={"assets/img.png"}
      >
        <Button Text={"Join"} />
      </FriendsPattren>
    </div>
  );
};

export default MyGroups;
