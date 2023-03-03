import React from 'react'
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import Flex from "../components/Flex";
import NotifiMessage from '../components/NotifiMessage';
const Notifications = () => {
  return (
    <div className="p-6">
      <Flex className={`gap-x-5 justify-between`}>
        <div className="w-[10%]">
          <Sidebar active="notification" />
        </div>
        <div className="w-[88%]">
          <Search />
          <NotifiMessage notifiMessage="Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi." />
        </div>
      </Flex>
    </div>
  );
}

export default Notifications