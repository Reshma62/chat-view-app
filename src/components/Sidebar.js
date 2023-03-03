import React, { useState } from "react";
import Flex from "./Flex";
import Icons from "./Icons";
import { AiOutlineHome, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { MdOutlineNotifications, MdCloudUpload } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../slices/userSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import Modal from "./Modal";
const Sidebar = ({ active }) => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [ modalShow, setModalShow ] = useState( false );

   const [isOpen, setIsOpen] = useState(false);

   function toggleModal() {
    //  setIsOpen( !isOpen );
     setModalShow(!modalShow);
   }
  let data = useSelector((state) => state.alluserLoginInfo.userInfo);
  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("allUserLoginInfo");
        dispatch(userLoginInfo(null));
      })
      .catch((error) => {
        // An error happened.
      });
    /*  */
  };
  let handleModalOpen = () => {
    setModalShow(true);
  };
  return (
    <>
      <div className="bg-[#5F35F5] h-screen rounded-xl">
        <div className={`h-[70%]`}>
          <Flex className=" items-center justify-center] mb-20 flex-col">
            <div className="relative group">
              <div className="w-[120px] h-[120px] rounded-full">
                <img
                  src={data && data.photoURL}
                  alt=""
                  className="mx-auto  mt-6 rounded-full"
                />
              </div>
              <div
                onClick={toggleModal}
                className=" opacity-0 group-hover:opacity-100 absolute w-[120px] h-[120px] mt-6 bg-[rgba(0,0,0,.4)] rounded-full top-0 left-0 flex justify-center items-center "
              >
                <MdCloudUpload className="text-white text-3xl  rounded-full" />
              </div>
            </div>
            <h2 className="mt-8 text-white font-nunito font-semibold text-xl">
              {data && data.displayName}
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
            <Link
              onClick={handleLogOut}
              className=" text-primary relative z-10 ml-9 py-4 mt-auto"
            >
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
      
      {modalShow && <Modal onClick={toggleModal} />}
    </>
  );
};

export default Sidebar;
