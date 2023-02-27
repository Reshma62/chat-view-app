import React from "react";
import Flex from "../components/Flex";
import FriendsList from "../components/FriendsList";
import AllGroupList from "../components/AllGroupList";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Message = () => {
  return (
    <div className="p-6">
      <Flex className={`gap-x-5 justify-between`}>
        <div className="w-[10%]">
          <Sidebar active="message" />
        </div>
        <div className="w-[33%]">

          <AllGroupList />
          <FriendsList />
        </div>
        <div className="w-[56%]">
          <Chat/>
        </div>
      </Flex>
    </div>
  );
}

export default Message