import React from "react";
import BlockUser from "../components/BlockUser";
import Button from "../components/Button";
import Flex from "../components/Flex";
import FriendReq from "../components/FriendReq";
import FriendsList from "../components/FriendsList";
import FriendsPattren from "../components/FriendsPattren";
import GroupList from "../components/GroupList";
import Headings from "../components/Headings";
import MyGroups from "../components/MyGroups";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";

const Home = () => {
  return (
    <div className="p-6">
      <Flex className={`gap-x-5 justify-between`}>
        <div className="w-[10%]">
          <Sidebar active="home" />
        </div>
        <div className="w-[33%]">
          <Search />
          <GroupList />
          <FriendReq />
        </div>
        <div className="w-[28%]">
          <FriendsList />
          <MyGroups/>
        </div>
        <div className="w-[28%]">
          <UserList />
          <BlockUser/>
        </div>
      </Flex>
    </div>
  );
};

export default Home;
