import React from "react";
import Flex from "../components/Flex";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import { AiFillEdit } from "react-icons/ai";
const Settings = () => {
  return (
    <div className="p-6">
      <Flex className={`gap-x-5 justify-between`}>
        <div className="w-[10%]">
          <Sidebar active="settings" />
        </div>
        <div className="w-[88%]">
          <Search />
          <Flex className={`justify-between gap-x-8`}>
            <div className="w-1/2 shadow-xl p-6">
              <h2 className="font-bold font-nunito text-xl mb-12">
                Profile Settings
              </h2>
              <Flex
                className={` pb-6 gap-x-8 items-center border-b border-black/25 border-solid `}
              >
                <div>
                  <img src="assets/profile.png" alt="" />
                </div>
                <div className="">
                  <h2 className="font-bold font-nunito text-2xl">
                    Profile Name.
                  </h2>
                  <p className="font-normal font-nunito text-xl">
                    Profile Status Info.{" "}
                  </p>
                </div>
              </Flex>
              <div>
                <div className="flex gap-x-10 items-center my-5 pl-10">
                  <AiFillEdit className="text-4xl" />
                  <p className="font-normal font-nunito text-xl">
                    Edit Profile Name.
                  </p>
                </div>
                <div className="flex gap-x-10 items-center my-5 pl-10">
                  <AiFillEdit className="text-4xl" />
                  <p className="font-normal font-nunito text-xl">
                    Edit Profile Name.
                  </p>
                </div>
                <div className="flex gap-x-10 items-center my-5 pl-10">
                  <AiFillEdit className="text-4xl" />
                  <p className="font-normal font-nunito text-xl">
                    Edit Profile Name.
                  </p>
                </div>
                <div className="flex gap-x-10 items-center my-5 pl-10">
                  <AiFillEdit className="text-4xl" />
                  <p className="font-normal font-nunito text-xl">
                    Edit Profile Name.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 shadow-xl p-6">
              <h2 className="font-bold font-nunito text-xl mb-12">
                Profile Settings
              </h2>
              <div className="flex gap-x-10 items-center my-5 pl-10">
                <AiFillEdit className="text-4xl" />
                <p className="font-normal font-nunito text-xl">
                  Edit Profile Name.
                </p>
              </div>{" "}
              <div className="flex gap-x-10 items-center my-5 pl-10">
                <AiFillEdit className="text-4xl" />
                <p className="font-normal font-nunito text-xl">
                  Edit Profile Name.
                </p>
              </div>{" "}
              <div className="flex gap-x-10 items-center my-5 pl-10">
                <AiFillEdit className="text-4xl" />
                <p className="font-normal font-nunito text-xl">
                  Edit Profile Name.
                </p>
              </div>
            </div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default Settings;
