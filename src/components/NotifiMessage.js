import React from "react";
import { MdOutlineNotifications } from "react-icons/md";
import Flex from "./Flex";
const NotifiMessage = ({notifiMessage}) => {
  return (
    <div className="mt-10 h-[90%] shadow-xl p-6 rounded-2xl bg-white overflow-y-scroll">
      <Flex className={`gap-x-11 items-center border-b border-solid border-black/25 pb-3`}>
        <MdOutlineNotifications className="text-5xl" />
        <p className="font-medium font-nunito text-lg text-black">
          {notifiMessage}
        </p>
      </Flex>
    </div>
  );
};

export default NotifiMessage;
