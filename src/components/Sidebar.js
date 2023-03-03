import React from "react";
import Flex from "./Flex";
import Icons from "./Icons";
import { AiOutlineHome, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { MdOutlineNotifications } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
const Sidebar = ({active}) => {
  return (
    <div className="bg-[#5F35F5] h-screen rounded-xl">
      <div className={`h-[70%]`}>
        <Flex className=" items-center justify-center] mb-20 flex-col">
          <img src="assets/profile.png" alt="" className="mx-auto  mt-6" />
          <h2 className="mt-8 text-white font-nunito font-semibold text-xl">
            Display Name
          </h2>
        </Flex>
        <Flex className=" flex-col h-full gap-y-8">
          <Link to={`/`} className=" text-primary relative z-10 ml-9 py-4">
            <AiOutlineHome
              className={`${
                active == "home" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
              } mx-auto text-5xl`}
            />
            <div
              className={`absolute ${
                active == "home" ? "bg-white" : "bg-transparent"
              } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
            ></div>
            <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
          </Link>
          <Link
            to={`/message`}
            className=" text-primary relative z-10 ml-9 py-4"
          >
            <AiFillMessage
              className={`${
                active == "message" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
              } mx-auto text-5xl`}
            />
            <div
              className={`absolute ${
                active == "message" ? "bg-white" : "bg-transparent"
              } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
            ></div>
            <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
          </Link>
          <Link
            to={`/notification`}
            className=" text-primary relative z-10 ml-9 py-4"
          >
            <MdOutlineNotifications
              className={`${
                active == "notification" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
              } mx-auto text-5xl`}
            />
            <div
              className={`absolute ${
                active == "notification" ? "bg-white" : "bg-transparent"
              } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
            ></div>
            <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
          </Link>
          <Link
            to={`/settings`}
            className=" text-primary relative z-10 ml-9 py-4"
          >
            <AiFillSetting
              className={`${
                active == "settings" ? "text-[#5F35F5]" : "text-[#BAD1FF]"
              } mx-auto text-5xl`}
            />
            <div
              className={`absolute ${
                active == "settings" ? "bg-white" : "bg-transparent"
              } w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
            ></div>
            <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
          </Link>
          <Link className=" text-primary relative z-10 ml-9 py-4 mt-auto">
            <SlLogout
              className={` text-[#BAD1FF]
               mx-auto text-5xl`}
            />
            <div
              className={`absolute  bg-transparent
               w-full h-full top-0 left-0 -z-10 rounded-tl-lg rounded-bl-lg`}
            ></div>
            <div className="absolute bg-[#5F35F5] w-[8px] h-full right-0 top-0 -z-10 rounded-tl-lg rounded-bl-lg"></div>
          </Link>
        </Flex>
      </div>
    </div>
  );
};

export default Sidebar;
